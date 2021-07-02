import { Global, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { isString } from '@frade-sam/samtools';
import { environment } from './utils';
import { IEnv, Environment } from './interface';

@Global()
@Injectable()
export class ConfigurationService extends ConfigService {
  getEnvironment(key?: keyof Environment): IEnv | string {
    if (!isString(key)) return environment();
    return this.get(key);
  }
}
