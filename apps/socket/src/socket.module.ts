import { ConfigurationModule } from '@app/configuration';
import { TaskModule } from '@app/task';
import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';

@Module({
  imports: [ConfigurationModule, TaskModule],
  providers: [SocketGateway],
})
export class SocketModule {}
