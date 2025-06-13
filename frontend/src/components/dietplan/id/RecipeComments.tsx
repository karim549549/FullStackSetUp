import React from 'react';
import Image from 'next/image';
import { Comment } from '@/lib/types/diet.types';

interface RecipeCommentsProps {
  comments: Comment[];
}

export function RecipeComments({ comments }: RecipeCommentsProps) {
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment.id} className="flex gap-3">
          <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src={comment.user.avatar || '/placeholder-avatar.jpg'}
              alt={comment.user.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <p className="text-sm font-medium">{comment.user.name}</p>
              <span className="text-xs text-muted-foreground">
                {new Date(comment.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{comment.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
} 