import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { isObject, isString } from '@frade-sam/samtools';
import { JobOptions, Queue } from 'bull';
import { v4 } from 'uuid';
import { createQr } from '@app/tools';
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

  async createScanCode(data: string) {
    if (!isString(data)) return null;
    // 负载
    const payload: Partial<ScancodePayload> = {};
    payload.timestemp = new Date().getTime();
    payload.uuid = v4();
    payload.status = false;
    payload.data = data;
    // 任务配置
    const options: JobOptions = {
      removeOnComplete: false,
      removeOnFail: true,
      delay: 60000, // 延迟60秒之后自动删除
    };
    const job = await this.noticeQueue.add('createQrcode', payload, options);
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
}
