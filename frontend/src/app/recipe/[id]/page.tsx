import { recipeApi } from '@/services/apis/recipe.apis';
import { RecipeDetail } from '@/components/recipe/RecipeDetail';
import { notFound } from 'next/navigation';
import MainNavbar from '@/components/custom/MainNavbar';

interface RecipeDetailPageProps {
  params: {
    id: string;
  };
}

export default async function RecipeDetailPage({ params }: RecipeDetailPageProps) {
  const { id } = await params;
  const recipe = await recipeApi.getRecipeById(id);
  
  if (!recipe) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <RecipeDetail recipe={recipe} />
    </div>
  );
}
