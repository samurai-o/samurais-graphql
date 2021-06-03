import { Global, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { isString } from '@frade-sam/samtools';
import { environment } from './utils';
import { envc, Environment } from './utils/const';

@Global()
@Injectable()
export class ConfigurationService extends ConfigService {
  getEnvironment(key?: keyof Environment): envc | string {
    if (!isString(key)) return environment();
    return this.get(key);
  }
}
