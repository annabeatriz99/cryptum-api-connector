import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { CryptumService } from './cryptum.service';

describe('CryptumService', () => {
  let service: CryptumService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CryptumService, ConfigService],
    }).compile();

    service = module.get<CryptumService>(CryptumService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
