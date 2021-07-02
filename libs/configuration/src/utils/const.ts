export type env = 'production' | 'development' | 'default';

export enum ENV {
  production = 'production.env',
  development = 'development.env',
  default = 'app.env',
}

export const DEFAULT_SECRET = 'samurai-session-94-?';
export const DEFAULT_SESSION_NAME = 'SAMURAI-SESSION';
export const JWT_SECRETORKEY = 'SAMURAI-SECRET-94-?';
