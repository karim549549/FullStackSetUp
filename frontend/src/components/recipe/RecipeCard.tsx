import { RecipePaginationView } from '@/lib/types/recipe.types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Clock, Heart, Users, Utensils, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface RecipeCardProps {
  recipe: RecipePaginationView;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link href={`/recipe/${recipe.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.02 }}
      >
        <Card className="group h-full hover:bg-transparent relative overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer hover:border-pink-500 dark:bg-zinc-800">
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <motion.div
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={recipe.imageUrl || '/placeholder-recipe.jpg'}
                alt={recipe.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <motion.div 
              className="absolute top-3 w-full rotate-40 -right-25 z-10"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <Badge variant="secondary" className="w-full bg-red-500/90 text-white px-2 py-1 text-xs font-medium flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                {recipe.source === 'COMMUNITY' ? 'Community' : 'App'}
              </Badge>
            </motion.div>
            <motion.div 
              className="absolute bottom-4 left-4 right-4 flex items-center justify-between"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-400" />
                <span className="text-sm text-white">{recipe.cookTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-red-400" />
                <span className="text-sm text-white">{recipe.likes || 0}</span>
              </div>
            </motion.div>
          </div>
          <CardHeader className="space-y-2">
            <motion.div 
              className="flex items-start justify-between"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.3 }}
            >
              <h3 className='font-semibold line-clamp-2'>
                {recipe.title}
              </h3>
            </motion.div>
          </CardHeader>
          <CardContent>
            <motion.div 
              className="flex flex-wrap gap-2"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">
                <Clock className="h-3 w-3 mr-1" />
                {recipe.cookTime}
              </Badge>
              <Badge variant="secondary" className="bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300">
                <Heart className="h-3 w-3 mr-1" />
                {recipe.likes}
              </Badge>
              {recipe.serving && (
                <Badge variant="secondary" className="bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300">
                  <Users className="h-3 w-3 mr-1" />
                  {recipe.serving}
                </Badge>
              )}
              {recipe.tags.slice(0, 2).map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="border-violet-200 dark:border-violet-800 text-violet-600 dark:text-violet-400"
                >
                  <Utensils className="h-3 w-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </motion.div>
          </CardContent>
          <CardFooter className="flex justify-between text-sm text-muted-foreground">
            <span>{recipe.serving} servings</span>
          </CardFooter>
        </Card>
      </motion.div>
    </Link>
  );
} 