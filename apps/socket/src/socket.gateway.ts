/* eslint-disable @typescript-eslint/no-unused-vars */
import { NoticeService } from '@app/task';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';

@WebSocketGateway()
export class SocketGateway {
  constructor(private readonly notice: NoticeService) {}

  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: string): string {
    console.log(data);
    return 'Hello world!';
  }
}
