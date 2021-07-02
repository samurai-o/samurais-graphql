import { IoAdapter } from '@nestjs/platform-socket.io';
import { createAdapter } from 'socket.io-redis';
import { RedisClient } from 'redis';
import { environment } from '@app/configuration';
import { WsAdapter } from '@nestjs/platform-ws';

export class RedisIoAdapter extends IoAdapter {
  createIOServer(port: number, options?: any): any {
    const { cacheURL, cacheProt, cachePass } = environment();

    const pubClient = new RedisClient({
      host: cacheURL,
      port: Number(cacheProt),
      password: cachePass,
      db: 5,
    });

    const server = super.createIOServer(port, options);
    const redisAdapter = createAdapter({
      pubClient,
      subClient: pubClient.duplicate(),
    });
    server.adapter(redisAdapter);
    return server;
  }
}

export class SocketAdapter extends WsAdapter {
  create(port: number, options?: any): any {
    const { cacheURL, cacheProt, cachePass } = environment();

    const pubClient = new RedisClient({
      host: cacheURL,
      port: Number(cacheProt),
      password: cachePass,
      db: 5,
    });

    const redisAdapter = createAdapter({
      pubClient,
      subClient: pubClient.duplicate(),
    });
    const server = super.create(port, options);
    server.adapter(redisAdapter);
    return server;
  }
}
