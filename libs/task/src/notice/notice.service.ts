import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { isObject, isString } from '@frade-sam/samtools';
import { JobOptions, Queue } from 'bull';
import { createQr } from '@app/tools';
import { v4 } from 'uuid';
import aes from '@app/tools/crypto';
import { ScancodePayload } from './interfaces';

export enum ScancodeAction {
  'code', // 二维码生成
  'scan', // 扫码
  'abolish', // 二维码超时过期
}

@Injectable()
export class NoticeService {
  constructor(
    @InjectQueue('notice')
    private readonly noticeQueue: Queue<Partial<ScancodePayload>>,
  ) {}

  get queue() {
    return this.noticeQueue;
  }

  /**
   * 创建job
   * @param name
   * @param data
   * @returns
   */
  private async createJob(name: string, data: string) {
    if (!isString(data)) return null;
    const payload: Partial<ScancodePayload> = {};
    payload.timestemp = new Date().getTime();
    payload.uuid = v4();
    payload.status = false;
    payload.data = data;
    const options: JobOptions = {
      removeOnComplete: false,
      removeOnFail: true,
      delay: 60000, // 延迟60秒之后自动删除
    };
    return await this.noticeQueue.add(name, payload, options);
  }

  /**
   * 创建扫码任务
   * @param data
   * @returns
   */
  async createScanCode(data: string) {
    const job = await this.createJob('createQrcode', data);
    if (!job) return null;
    return createQr(JSON.stringify({ id: job.id, payload: data }))
      .then((code: string) => {
        return { id: job.id, code };
      })
      .catch(() => {
        job.moveToFailed({ message: 'error' }, true);
        return { id: null, code: null };
      });
  }

  /**
   * 扫码
   * @param id
   */
  async scanCode(id: any, payload: any) {
    const job = await this.noticeQueue.getJob(id);
    if (!isObject(payload)) return null;
    await job.moveToCompleted(JSON.stringify(payload), true, true);
  }

  /**
   * 创建验证code
   */
  async createVerificationCode(data: string) {
    const job = await this.createJob('createVerificationCode', data);
    if (!job) return null;
    return aes.encrypt(JSON.stringify({ ID: job.id }));
  }

  /**
   * 验证邮箱
   * @param code
   * @param payload
   */
  async verificationCode(code: string, payload: any) {
    const { ID } = JSON.parse(aes.decrypt(code));
    const job = await this.noticeQueue.getJob(ID);
    const [, id] = await job.moveToCompleted(
      JSON.stringify(payload),
      true,
      true,
    );
    return id;
  }
}
