import { Test, TestingModule } from '@nestjs/testing';
import { PrismastoreService } from './prismastore.service';

describe('PrismastoreService', () => {
  let service: PrismastoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismastoreService],
    }).compile();

    service = module.get<PrismastoreService>(PrismastoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
