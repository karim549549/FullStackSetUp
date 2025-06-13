'use client';

import React, { useEffect } from 'react';
import { DietPlanApis } from '@/services/apis/dietplan.apis';

interface DietPlanDetailProps {
  dietPlanId: string;
}

export function DietPlanDetail({ dietPlanId }: DietPlanDetailProps) {
  useEffect(() => {
    async function fetchDietPlan() {
      try {
        const response = await DietPlanApis.getDietPlanById(dietPlanId);
        console.log('DietPlanDetail API response:', response);
      } catch (error) {
        console.error('Error fetching diet plan detail:', error);
      }
    }
    fetchDietPlan();
  }, [dietPlanId]);

  return <div>Check console for API response</div>;
} 