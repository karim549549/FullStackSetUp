import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import { DietPlan } from '@/lib/types/diet.types';
import background from '@/assets/recipes.png';

interface HeroSectionProps {
  dietPlan: DietPlan;
}

export function HeroSection({ dietPlan }: HeroSectionProps) {
  return (
    <div className="relative h-[400px] w-full">
      <Image
        src={background}
        alt={dietPlan.name}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      
      {/* Back Button */}
      <Link href="/" className="absolute top-4 left-4 z-10">
        <Button variant="ghost" size="icon" className="bg-black/20 hover:bg-black/40 text-white cursor-pointer">
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </Link>

      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">{dietPlan.name}</h1>
        <p className="text-base opacity-90 mb-3">{dietPlan.description}</p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="bg-violet-500/20 text-violet-300 border-violet-500/30">
            {dietPlan.goal}
          </Badge>
        </div>
      </div>
    </div>
  );
} 