/* eslint-disable @typescript-eslint/no-unused-vars */
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway({ namespace: '/chat' })
export class SocketGateway {
  @SubscribeMessage('message')
  handleMessage(_client: any, _payload: any): string {
    return 'Hello world!';
  }
}
