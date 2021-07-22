/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NoticeService, ScancodeAction } from '@app/task';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Subject, from } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@WebSocketGateway()
export class SocketGateway {
  constructor(private readonly notice: NoticeService) { }

  @SubscribeMessage('qrcode')
  async handleMessage(@MessageBody() data: string) {
    const message = new Subject();
    const job = await this.notice.createScanCode(data);
    const sub = from(message);
    const scancode = {
      type: ScancodeAction['code'],
      data: !job ? null : job.code,
    };
    // 扫码成功后触发
    this.notice.queue.once(
      'global:completed',
      (jobId: string, value: string) => {
        if (jobId == job.id)
          message.next({ type: ScancodeAction['scan'], data: value });
      },
    );
    // 二维码超时作废通知
    this.notice.queue.once('global:failed', (jobId: string, value: string) => {
      if (jobId == job.id)
        message.next({
          type: ScancodeAction['abolish'],
          data: null,
          message: value,
        });
    });
    return sub.pipe(
      startWith(scancode),
      map((v: any) => ({ event: 'qrcode', ...v })),
    );
  }
}
