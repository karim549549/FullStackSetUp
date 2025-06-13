import { Skeleton } from "@/components/ui/skeleton";
import MainNavbar from '@/components/custom/MainNavbar';

export default function RecipeFilterLoading() {
  return (
    <div className="min-h-screen dark:bg-zinc-900">
      <MainNavbar />
      <main className="container mx-auto px-4 py-8">
        <div className='flex flex-col items-center max-w-6xl mx-auto'>
          <div className='w-full items-start flex-col gap-2 md:p-15 p-4 mb-5 rounded-md'>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-12 w-96 mb-2" />
            <Skeleton className="h-4 w-32" />
          </div>
          <div className='items-center w-full md:flex hidden gap-5 justify-center'>
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-14 w-40" />
            ))}
          </div>
          <hr className='my-3 border-b-[1px] w-full border-zinc-400 shadow-md rounded-full dark:border-zinc-800' />
        </div>

        {/* Filter Bar Skeleton */}
        <div className="flex justify-end mb-6">
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>

        {/* Recipe Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex flex-col space-y-3">
              <Skeleton className="h-[200px] w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-20" />
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Skeleton */}
        <div className="flex justify-center mt-8 gap-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-10 w-10 rounded-full" />
          ))}
        </div>
      </main>
    </div>
  );
} 