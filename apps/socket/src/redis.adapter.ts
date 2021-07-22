import { IoAdapter } from '@nestjs/platform-socket.io';
import { createAdapter } from 'socket.io-redis';
import { RedisClient } from 'redis';
import { environment } from '@app/configuration';

export class RedisAdapter extends IoAdapter {
  createIOServer(port: number) {
    const { cacheURL, cacheProt, cachePass } = environment();
    const server = super.createIOServer(port);
    const pubClient = new RedisClient({
      host: cacheURL,
      password: cachePass,
      port: Number(cacheProt),
      db: 7,
    });
    const subClient = pubClient.duplicate();
    const adapter = createAdapter({ pubClient, subClient });
    server.adapter(adapter);
    return server;
  }
}
