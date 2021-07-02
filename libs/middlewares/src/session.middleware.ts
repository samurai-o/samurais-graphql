import { Injectable, NestMiddleware } from '@nestjs/common';
import * as session from 'express-session';
import * as redis from 'redis';
import * as connectRedis from 'connect-redis';
import {
  DEFAULT_SECRET,
  DEFAULT_SESSION_NAME,
  environment,
} from '@app/configuration';

const { cacheURL, cachePass } = environment();
const Session = connectRedis(session);

export const useSession = session({
  name: DEFAULT_SESSION_NAME,
  secret: DEFAULT_SECRET,
  resave: true,
  rolling: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
  store: new Session({
    client: redis.createClient({
      host: cacheURL,
      port: 6379,
      password: cachePass,
      db: 0,
      no_ready_check: true,
    }),
    ttl: 1800,
    logErrors: true,
  }),
});

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    useSession(req, res, next);
  }
}
