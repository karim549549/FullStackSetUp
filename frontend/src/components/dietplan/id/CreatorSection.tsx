import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Bookmark, Star } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DietPlan } from '@/lib/types/diet.types';

interface CreatorSectionProps {
  dietPlan: DietPlan;
}

export function CreatorSection({ dietPlan }: CreatorSectionProps) {
  return (
    <Card className="h-full">
      <CardContent className="p-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80"
                alt="FitAI"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Created by</p>
              <p className="font-medium">FitAI</p>
              <p className="text-xs text-muted-foreground">2 days ago</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2 text-pink-500 hover:text-pink-600 hover:bg-pink-50 dark:hover:bg-pink-950/20 cursor-pointer bg-pink-50/50 dark:bg-pink-950/10">
                    <Heart className="w-4 h-4" />
                    <span>{dietPlan.likes}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Coming soon</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2 text-blue-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/20 cursor-pointer bg-blue-50/50 dark:bg-blue-950/10">
                    <Bookmark className="w-4 h-4" />
                    <span>Save</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Coming soon</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2 text-yellow-500 hover:text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-950/20 cursor-pointer bg-yellow-50/50 dark:bg-yellow-950/10">
                    <Star className="w-4 h-4" />
                    <span>{dietPlan.averageRating.toFixed(1)}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Coming soon</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 