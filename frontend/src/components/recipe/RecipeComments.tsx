"use client";

import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare, Lock } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface Comment {
  id: number;
  user: {
    name: string;
    avatar: string;
  };
  text: string;
  time: string;
}

interface RecipeCommentsProps {
  comments: Comment[];
}

export function RecipeComments({ comments }: RecipeCommentsProps) {
  return (
    <Card className="bg-white dark:bg-zinc-800">
      <CardContent className="p-4">
        {/* Comments List */}
        <div className="space-y-4 mb-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{comment.user.name}</span>
                  <span className="text-xs text-muted-foreground">{comment.time}</span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">{comment.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Comment Input */}
        <div className="space-y-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="relative">
                  <Textarea
                    placeholder="Share your thoughts about this recipe..."
                    className="min-h-[80px] resize-none bg-gray-50 dark:bg-zinc-900"
                    disabled
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/5 dark:bg-white/5 backdrop-blur-sm rounded-md">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Lock className="h-4 w-4" />
                      <span className="text-sm">Comments coming soon</span>
                    </div>
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Comments feature will be available soon</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  );
} 