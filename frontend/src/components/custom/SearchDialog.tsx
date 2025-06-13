"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Search, Clock, Salad, Drumstick, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useDebounce } from '@/hooks/useDebounce';

export default function SearchDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const debouncedSearch = useDebounce(searchQuery, 300);

  // Load recent searches from localStorage
  useEffect(() => {
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      try {
        const parsed = JSON.parse(savedSearches);
        // Ensure we only store strings
        setRecentSearches(Array.isArray(parsed) ? parsed.filter(s => typeof s === 'string') : []);
      } catch (e) {
        setRecentSearches([]);
      }
    }
  }, []);

  // Save recent search
  const saveRecentSearch = (query: string) => {
    if (!query.trim()) return;
    const newSearches = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
    setRecentSearches(newSearches);
    localStorage.setItem('recentSearches', JSON.stringify(newSearches));
  };

  // Clear search input
  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="w-[9rem] overflow-hidden"> 
          <div className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent cursor-pointer">
            <Search className="h-4 w-4" />
            <span className="text-sm">Search...</span>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-0">
        <DialogHeader className="p-4 border-b border-white/10">
          <DialogTitle className="text-lg font-semibold">Search</DialogTitle>
        </DialogHeader>

        {/* Search Input */}
        <div className="p-4 relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-500" />
            <Input
              type="text"
              placeholder="Search for diets and recipes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <X className="h-4 w-4 text-neutral-500 hover:text-neutral-400" />
              </button>
            )}
          </div>
        </div>

        {/* Results Area */}
        <ScrollArea className="h-[400px] relative">
          {!searchQuery ? (
            // Recent Searches
            <div className="p-4">
              <h3 className="text-sm font-semibold text-neutral-400 mb-3 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Recent Searches
              </h3>
              {recentSearches.length > 0 ? (
                <div className="space-y-2">
                  {recentSearches.map((search, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-neutral-500" />
                        <span className="text-sm text-neutral-200">{search}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-neutral-500">No recent searches</p>
              )}
            </div>
          ) : (
            // Search Results with Blur Overlay
            <div className="relative">
              <div className="p-4 space-y-6">
                {/* Diet Results Section */}
                <div>
                  <h3 className="text-sm font-semibold text-neutral-400 mb-3 flex items-center gap-2">
                    <Salad className="h-4 w-4 text-emerald-500" />
                    Diet Plans
                  </h3>
                  <div className="space-y-2">
                    {/* Placeholder for diet results */}
                    <p className="text-sm text-neutral-500">No diet plans found</p>
                  </div>
                </div>

                {/* Recipe Results Section */}
                <div>
                  <h3 className="text-sm font-semibold text-neutral-400 mb-3 flex items-center gap-2">
                    <Drumstick className="h-4 w-4 text-amber-500" />
                    Recipes
                  </h3>
                  <div className="space-y-2">
                    {/* Placeholder for recipe results */}
                    <p className="text-sm text-neutral-500">No recipes found</p>
                  </div>
                </div>
              </div>

              {/* Blur Overlay */}
              <div className="absolute inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-white mb-2">Elastic Search</h3>
                  <p className="text-sm text-neutral-300">Coming Soon</p>
                </div>
              </div>
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
