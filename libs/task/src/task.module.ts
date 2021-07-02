import {
  ConfigurationModule,
  ConfigurationService,
  IEnv,
} from '@app/configuration';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { NoticeProcessor, NoticeService } from './notice';

@Module({
  imports: [
    BullModule.registerQueueAsync({
      name: 'notice',
      imports: [ConfigurationModule],
      useFactory: (config: ConfigurationService) => {
        const { cacheURL, cacheProt, cachePass } =
          config.getEnvironment() as IEnv;
        return {
          redis: {
            host: cacheURL,
            port: Number(cacheProt),
            password: cachePass,
            db: 2,
          },
        };
      },
      inject: [ConfigurationService],
    }),
  ],
  providers: [NoticeService, NoticeProcessor],
  exports: [NoticeService],
})
export class TaskModule { }
