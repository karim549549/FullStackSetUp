'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { RecipeCard } from './RecipeCard';
import { PaginationBar } from './PaginationBar';
import {   RecipeFilter, RecipePaginationView, RecipeResponse } from '@/lib/types/recipe.types';
import { Menu } from 'lucide-react';
import { Drawer, DrawerContent, DrawerTrigger } from '../ui/drawer';
import { RecipeFilterBar } from './RecipeFilterBar';


interface RecipeFilterClientProps {
  initialData: RecipeResponse;
  filter: RecipeFilter
}


export function RecipeFilterClient({ initialData , filter }: RecipeFilterClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilterChange = (key: keyof RecipeFilter, value: string | string[] | undefined) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      if (Array.isArray(value)) {
        params.set(key, value.join(','));
      } else {
        params.set(key, value);
      }
    } else {
      params.delete(key);
    }
    params.set('page', '1');
    router.push(`/recipe/filter?${params.toString()}`);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`/recipe/filter?${params.toString()}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Mobile Drawer */}
        <div className="md:hidden">
          <Drawer>
            <DrawerTrigger>
              <Menu className="w-8 h-8" />
            </DrawerTrigger>
            <DrawerContent data-vaul-drawer-direction="left" className="h-[100vh]">
              <div className="p-4">
                <RecipeFilterBar filter={filter} onFilterChange={handleFilterChange} />
              </div>
            </DrawerContent>
          </Drawer>
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden md:block md:col-span-3">
          <RecipeFilterBar filter={filter} onFilterChange={handleFilterChange} />
        </div>

        {/* Main Content */}
        <div className="md:col-span-9 flex flex-col ">
          <div className="flex w-full  h-fit justify-end md:px-5">
            <PaginationBar
              meta={initialData.meta}
              currentPage={Number(searchParams.get('page')) || 1}
              onPageChange={handlePageChange}
            />
          </div>
          <hr className="my-3 border-b-[1px] border-zinc-600 shadow-md rounded-full dark:border-zinc-800" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {initialData.items.map((recipe: RecipePaginationView) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
          <PaginationBar
            meta={initialData.meta}
            currentPage={Number(searchParams.get('page')) || 1}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
} 