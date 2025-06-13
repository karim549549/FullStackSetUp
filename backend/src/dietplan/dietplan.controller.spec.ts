import { Test, TestingModule } from '@nestjs/testing';
import { DietplanController } from './dietplan.controller';

describe('DietplanController', () => {
  let controller: DietplanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DietplanController],
    }).compile();

    controller = module.get<DietplanController>(DietplanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
