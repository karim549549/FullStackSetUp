"use client";

import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Utensils, ChevronDown, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Recipe } from '@/lib/types/recipe.types';

interface RecipeHeroProps {
  recipe: Recipe;
  isExpanded: boolean;
  onExpandToggle: () => void;
}

export function RecipeHero({ recipe, isExpanded, onExpandToggle }: RecipeHeroProps) {
  return (
    <div className="relative w-full h-[60vh]">
      <Image
        src={recipe.imageUrl || '/placeholder-recipe.jpg'}
        alt={recipe.title}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
      
      {/* Back to Recipes Link */}
      <Link 
        href="/recipe/filter"
        className="absolute top-6 left-6 flex items-center gap-2 text-white hover:text-white/80 transition-colors bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Back to Recipes</span>
      </Link>

      {/* Tags */}
      <div className="absolute top-6 right-6 flex flex-wrap gap-2 justify-end">
        {recipe.tags.map((tag) => (
          <motion.div
            key={tag}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Badge
              variant="secondary"
              className="bg-white/20 backdrop-blur-sm text-white border-none text-xs"
            >
              <Utensils className="h-3 w-3 mr-1" />
              {tag}
            </Badge>
          </motion.div>
        ))}
      </div>

      {/* Title and Description */}
      <div className="absolute bottom-8 left-8 right-8 text-white">
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          {recipe.title}
        </motion.h1>
        <div className="relative">
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={`text-base text-neutral-200 max-w-3xl ${!isExpanded ? 'line-clamp-2' : ''}`}
          >
            {recipe.description}
          </motion.p>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:text-white/80 p-0 h-auto"
            onClick={onExpandToggle}
          >
            <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </Button>
        </div>
      </div>
    </div>
  );
} 