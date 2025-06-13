// app/recipe/filter/[[...filter]]/page.tsx
import { MEAL_TYPE, RecipeFilter } from '@/lib/types/recipe.types';
import { RecipeFilterClient } from '@/components/recipe/RecipeFilterClient';
import { recipeApi } from '@/services/apis/recipe.apis';
import MainNavbar from '@/components/custom/MainNavbar';
import { ChevronRight } from 'lucide-react';

interface RecipeFilterPageProps {
  params: {
    filter?: string[];
  };
  searchParams?: {
    search?: string;
    cuisine?: string;
    mealType?: string;
    tags?: string;
    page?: string;
  };
}

export default async function RecipeFilterPage({ searchParams }: RecipeFilterPageProps) {
  const searchparam = await searchParams;
  const defaultFilter: RecipeFilter = {
    page: 1,
    limit: 30,
  };

  const filter: RecipeFilter = {
    ...defaultFilter,
    ...( searchparam?.search && { search: searchparam.search }),
    ...(searchparam?.cuisine && { cuisine: searchparam.cuisine }),
    ...(searchparam?.mealType && { mealType: searchparam.mealType as MEAL_TYPE }),
    ...(searchparam?.tags && { tags: searchparam.tags.split(',') }),
    ...(searchparam?.page && { page: Number(searchparam.page) }),
  };

  const data = await recipeApi.getFilteredRecipes(filter);
  console.log(data.meta);

  return (
    <div className="min-h-screen dark:bg-zinc-900">
      <MainNavbar />
      <main className="container mx-auto px-4 py-8">  
        <div className='flex flex-col items-center max-w-6xl mx-auto'>

          <div className='w-full    items-start  flex-col gap-2 md:p-15 p-4 mb-5 rounded-md  recipeLanding   '>
            <h4 className='capitalize text-2xl tracking-wide text-orange-500'>trending Now </h4>
            <p className='md:text-5xl text-2xl  font-black text-white '>Mike&apos;s famous salad <br /> with cheese </p>
            <span className='text-neutral-200 text-sm font-bold capitalize mt-3 ' >by Chef Mike</span>
          </div>
          <div className=' text-white items-center w-full md:flex hidden gap-5 justify-center'>
              <span className='p-5 gap-3 flex items-center justify-around  transition-all duration-200 hover:bg-red-700 bg-red-500 rounded-md '>
                  Recipes & meals  
                  <ChevronRight className='w-4 h-4 ' /> 
              </span> 
              <span className='p-5 gap-3 transition-all duration-200  hover:bg-orange-700 flex items-center justify-around bg-orange-500 rounded-md '>
                  share your recipe
                  <ChevronRight className='w-4 h-4' />
              </span> 
              <span className='p-5 gap-3 transition-all duration-200  hover:bg-green-900 flex items-center justify-around bg-green-700 rounded-md '>
                  custom meal plan 
                  <ChevronRight className='w-4 h-4' />
              </span>  
              <span className='p-5 gap-3 transition-all duration-200  hover:bg-blue-600 flex items-center justify-around bg-blue-500 rounded-md '>
                  create grocery list  
                  <ChevronRight className='w-4 h-4' />
              </span> 
              <span className='p-5 gap-3 transition-all duration-200 hover:bg-indigo-600 flex items-center justify-around bg-indigo-500 rounded-md '>
                  cooking tips & tricks  
                  <ChevronRight className='w-4 h-4' />
              </span> 
          </div>
          <hr className='my-3 border-b-[1px] w-full border-zinc-400  shadow-md rounded-full dark:border-zinc-800' />
        </div>
        <RecipeFilterClient filter={filter} initialData={data}  />
      </main>
    </div>
  );
}
