import { Skeleton } from "@/components/ui/skeleton";

export default function UserLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-6">
          {/* Header Skeleton */}
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-96" />
          </div>

          {/* Content Skeleton */}
          <div className="space-y-8">
            {/* Card 1 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-transparent rounded-2xl blur-xl" />
              <div className="relative bg-card border border-border rounded-2xl p-6">
                <Skeleton className="h-6 w-40 mb-6" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-transparent rounded-2xl blur-xl" />
              <div className="relative bg-card border border-border rounded-2xl p-6">
                <Skeleton className="h-6 w-40 mb-6" />
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-32" />
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                      {[...Array(8)].map((_, i) => (
                        <Skeleton key={i} className="h-12" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 