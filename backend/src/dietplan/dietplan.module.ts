import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { DietplanController } from './dietplan.controller';
import { DietplanService } from './dietplan.service';
import { DietApiService } from './diet.api';
import { DietPlanRepository } from './repositories/dietPlan.repo';
import { ProfileModule } from 'src/profile/profile.module';

@Module({
  imports: [HttpModule , ProfileModule],
  controllers: [DietplanController],
  providers: [DietplanService, DietApiService, DietPlanRepository],
})
export class DietplanModule {}
