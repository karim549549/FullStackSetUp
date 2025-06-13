import { Test, TestingModule } from '@nestjs/testing';
import { DietplanService } from './dietplan.service';

describe('DietplanService', () => {
  let service: DietplanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DietplanService],
    }).compile();

    service = module.get<DietplanService>(DietplanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
