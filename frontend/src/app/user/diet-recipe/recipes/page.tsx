"use client";

import { motion } from "framer-motion";
import { Soup, LayoutGrid, Table, Plus, ChevronDown, Clock, Tag, Users, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { RecipePaginationView, RecipeResponse } from "@/lib/types/recipe.types";
import { recipeApi } from "@/services/apis/recipe.apis";
import { RecipeCard } from "@/components/recipe/RecipeCard";
import Link from "next/link";
import {
  Table as TableComponent,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type ViewMode = "grid" | "table";

export default function RecipesPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [savedRecipes, setSavedRecipes] = useState<RecipePaginationView[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchSavedRecipes = async () => {
    setIsLoading(true);
    try {
      const response = await recipeApi.getSavedRecipes(page, 3);
      console.log('fetchSavedRecipes response:', response);
      if (response.items.length === 0) {
        setHasMore(false);
      } else {
        setSavedRecipes(prev => [...prev, ...response.items]);
        setPage(prev => prev + 1);
      }
    } catch (error) {
      console.error('Error fetching saved recipes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedRecipes();
  }, []);

  return (
    <div className="space-y-6 p-5">
      {/* View Switcher */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Soup className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-lg font-semibold text-foreground">Your Recipes</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("grid")}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "table" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("table")}
          >
            <Table className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Saved Recipes Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
          <div className="relative bg-background/50 backdrop-blur-xl border border-border rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-4">Saved Recipes</h3>
            
            {isLoading && savedRecipes.length === 0 ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-24 w-full" />
                ))}
              </div>
            ) : savedRecipes.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No saved recipes yet</p>
                <Button variant="outline" className="mt-4">
                  <Plus className="w-4 h-4 mr-2" />
                  Browse Recipes
                </Button>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedRecipes.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            ) : (
              <div className="rounded-md border">
                <TableComponent>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Cooking Time</TableHead>
                      <TableHead>Servings</TableHead>
                      <TableHead>Likes</TableHead>
                      <TableHead>Tags</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {savedRecipes.map((recipe) => (
                      <TableRow key={recipe.id} className="cursor-pointer hover:bg-accent/50">
                        <TableCell>
                          <Link href={`/recipe/${recipe.id}`} className="font-medium hover:underline">
                            {recipe.title}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{recipe.cookTime}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {recipe.serving && (
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span>{recipe.serving}</span>
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Heart className="h-4 w-4 text-red-500" />
                            <span>{recipe.likes}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {recipe.tags?.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                <Tag className="h-3 w-3 mr-1" />
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </TableComponent>
              </div>
            )}
            
            {hasMore && (
              <Button 
                variant="outline" 
                className="w-full mt-4"
                onClick={fetchSavedRecipes}
                disabled={isLoading}
              >
                {isLoading ? (
                  "Loading..."
                ) : (
                  <>
                    Load More
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            )}
          </div>
        </motion.div>

        <Separator className="my-6" />

        {/* Created Recipes Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative group"
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                  <div className="relative bg-background/50 backdrop-blur-xl border border-border rounded-2xl p-6 opacity-50">
                    <h3 className="text-lg font-semibold mb-4">Created Recipes</h3>
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">Coming Soon</p>
                    </div>
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Recipe creation feature coming soon!</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </motion.div>
      </div>
    </div>
  );
} 