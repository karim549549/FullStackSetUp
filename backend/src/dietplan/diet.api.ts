import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs'; 
import { MealPlanAPIResponse } from 'src/utils/types/diet.types';

@Injectable()
export class DietApiService {
  private readonly modelURL: string;
  private readonly logger = new Logger(DietApiService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.modelURL = this.configService.get<string>('MODEL_API_URL') || 'https://53a6-34-126-144-176.ngrok-free.app/';
  }

  async getDietPlan(data: any): Promise<any> {
    const jsonPayload = JSON.stringify(data);
    this.logger.debug('Sending request to model API:', jsonPayload);

    const response = await firstValueFrom(
      this.httpService.post(
        `${this.modelURL}generate-meal-plan`,
        jsonPayload,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Content-Length': Buffer.byteLength(jsonPayload).toString(),
          },
        },
      ),
    );
    return response.data;
  }
}
