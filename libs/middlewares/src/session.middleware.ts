import { Injectable, NestMiddleware } from '@nestjs/common';
import * as session from 'express-session';
import * as redis from 'redis';
import * as connectRedis from 'connect-redis';
import { environment } from '@app/configuration';

export const DEFAULT_SECRET = 'samurai-session-94-?';
export const DEFAULT_SESSION_NAME = 'SAMURAI-SESSION';
export const JWT_SECRETORKEY = 'SAMURAI-SECRET-94-?';

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
      db: 1,
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
