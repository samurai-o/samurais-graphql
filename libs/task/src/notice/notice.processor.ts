import { Processor, Process } from '@nestjs/bull';

@Processor('notice')
export class NoticeProcessor {
  /** 过期处理任务 */
  @Process({ name: 'createQrcode', concurrency: 2 })
  async scancode() {
    throw new Error('二维码过期');
  }
}
