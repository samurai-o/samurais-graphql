import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class NoticeService {
  constructor(@InjectQueue('notice') private readonly noticeQueue: Queue) { }

  async createScanCode() {
    await this.noticeQueue.add('scanCode', {
      id: 1,
    });
    this.noticeQueue.on('completed', (job) => {
      console.log(job);
    });
  }

  async scanCode(id: any) {
    console.log(id);
    const job = await this.noticeQueue.getJob(id);
    console.log(job);
    job.moveToCompleted();
  }
}
