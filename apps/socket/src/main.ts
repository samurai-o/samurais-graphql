import { ConfigurationService } from '@app/configuration';
import { Logger } from '@nestjs/common';
import { WsAdapter } from '@nestjs/platform-ws';
import { NestFactory } from '@nestjs/core';
import { SocketModule } from './socket.module';

async function bootstrap() {
  const app = await NestFactory.create(SocketModule);
  const config = app.get(ConfigurationService);
  const port = config.getEnvironment('SOCKET_PORT') as string;
  app.useWebSocketAdapter(new WsAdapter(app));
  await app.listen(port, () => {
    Logger.log('socket', '应用');
    Logger.log(port, '端口');
  });
}
bootstrap();
