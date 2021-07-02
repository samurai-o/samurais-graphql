import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class NoticeService {
  constructor(@InjectQueue('notice') private readonly noticeQueue: Queue) {}

  async createScanCode() {
    await this.noticeQueue.add(
      'scanCode',
      {
        id: 1,
      },
      { removeOnComplete: true, removeOnFail: true },
    );
    this.noticeQueue.on('completed', (job) => {
      console.log('job', job);
    });
  }

  async scanCode(id: any) {
    const job = await this.noticeQueue.getJob(id);
    job.moveToCompleted(null, true, true);
  }
}
