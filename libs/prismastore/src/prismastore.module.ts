import { Global, Module } from '@nestjs/common';
import { PrismastoreService } from './prismastore.service';

@Global()
@Module({
  providers: [PrismastoreService],
  exports: [PrismastoreService],
})
export class PrismastoreModule {}
