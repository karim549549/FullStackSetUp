import { Recipe } from '@prisma/client';

export type RecipePaginationView = Pick<
  Recipe,
  | 'id'
  | 'title'
  | 'imageUrl'
  | 'tags'
  | 'cookTime'
  | 'likes'
  | 'source'
  | 'serving'
>;
