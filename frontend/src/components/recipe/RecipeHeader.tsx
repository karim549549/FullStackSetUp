"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Users, Timer, User, Calendar, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { formatRelativeTime } from '@/lib/utils/date';

interface Creator {
  name: string;
  avatar: string;
  verified: boolean;
}

interface RecipeHeaderProps {
  creator: Creator;
  createdAt: string;
  cookTime: string;
  serving?: string;
  likes: number;
  isSaved: boolean;
  isSaving: boolean;
  onSaveToggle: () => void;
}

export function RecipeHeader({
  creator,
  createdAt,
  cookTime,
  serving,
  likes,
  isSaved,
  isSaving,
  onSaveToggle,
}: RecipeHeaderProps) {
  return (
    <Card className="bg-white dark:bg-zinc-800 shadow-lg">
      <CardContent className="p-6">
        <div className="flex flex-col gap-6">
          {/* Creator Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={creator.avatar} alt={creator.name} />
                <AvatarFallback>
                  <User className="h-6 w-6" />
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-lg text-gray-900 dark:text-white">{creator.name}</span>
                  {creator.verified && (
                    <Badge variant="secondary" className="bg-violet-100 dark:bg-violet-900/50 text-violet-700 dark:text-violet-300">
                      Verified
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{formatRelativeTime(createdAt)}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={isSaved ? 'saved' : 'unsaved'}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button 
                    variant={isSaved ? "default" : "outline"}
                    size="sm" 
                    className={cn(
                      "gap-2 transition-all duration-300",
                      isSaved ? "bg-violet-600 hover:bg-violet-700" : "",
                      isSaving && "opacity-50 cursor-not-allowed"
                    )}
                    onClick={onSaveToggle}
                    disabled={isSaving}
                  >
                    <Bookmark className={cn(
                      "h-4 w-4 transition-transform duration-300",
                      isSaved && "fill-current"
                    )} />
                    {isSaved ? "Saved" : "Save"}
                  </Button>
                </motion.div>
              </AnimatePresence>
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2 hover:bg-rose-50 dark:hover:bg-rose-900/50 hover:text-rose-600 dark:hover:text-rose-400"
              >
                <Heart className="h-4 w-4" />
                {likes}
              </Button>
            </div>
          </div>

          {/* Time and Servings */}
          <div className="flex justify-end gap-4">
            <div className="flex flex-col items-center">
              <Timer className="h-5 w-5 text-violet-500" />
              <span className="text-lg font-semibold mt-1">{cookTime}</span>
              <span className="text-xs text-muted-foreground">Cook Time</span>
            </div>
            {serving && (
              <div className="flex flex-col items-center">
                <Users className="h-5 w-5 text-violet-500" />
                <span className="text-lg font-semibold mt-1">{serving}</span>
                <span className="text-xs text-muted-foreground">Servings</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 