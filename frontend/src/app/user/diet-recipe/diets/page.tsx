"use client";

import { motion } from "framer-motion";
import { 
  Salad, 
  Loader2, 
  Table2, 
  LayoutGrid, 
  Crown, 
  ChevronDown,
  Heart,
  Star,
  Bookmark,
  MoreVertical,
  Eye,
  Pencil,
  Upload,
  Trash2,
  Target,
  Scale,
  MoreHorizontal,
  Power,
  PowerOff
} from "lucide-react";
import { useEffect, useState } from "react";
import { DietPlanApis } from "@/services/apis/dietplan.apis";
import { UserDietPlan, DIET_PLAN_STATUS } from "@/lib/types/diet.types";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

type ViewMode = 'cards' | 'table';
type DietFilter = 'all' | 'owned' | 'cloned';

export default function DietsPage() {
  const [dietPlans, setDietPlans] = useState<UserDietPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('cards');
  const [activeFilter, setActiveFilter] = useState<DietFilter>('all');
  const [expandedPlanId, setExpandedPlanId] = useState<string | null>(null);

  const getTimeAgo = (date: string) => {
    const now = new Date();
    const past = new Date(date);
    const diffInDays = Math.floor((now.getTime() - past.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return `${Math.floor(diffInDays / 30)} months ago`;
  };

  useEffect(() => {
    const fetchDietPlans = async () => {
      try {
        console.log('🔍 Fetching user diet plans...');
        const response = await DietPlanApis.getUserDietPlans();
        console.log('📦 Raw API Response:', response);

        if (response.success && response.data) {
          console.log('✅ Success response with data:', {
            items: response.data.items,
            total: response.data.total,
            page: response.data.page,
            totalPages: response.data.totalPages
          });

          response.data.items.forEach((plan, index) => {
            console.log(`📋 Diet Plan ${index + 1}:`, {
              id: plan.id,
              status: plan.status,
              dietPlan: {
                id: plan.dietPlan.id,
                name: plan.dietPlan.name,
                description: plan.dietPlan.description,
                goal: plan.dietPlan.goal,
                durationInWeeks: plan.dietPlan.durationInWeeks,
                mealPerDay: plan.dietPlan.mealPerDay,
                dietDays: plan.dietPlan.dietDays?.length || 0
              }
            });
          });

          setDietPlans(response.data.items);
        } else {
          console.error('❌ Failed response:', response);
          setError('Failed to fetch diet plans');
        }
      } catch (err) {
        console.error('❌ Error fetching diet plans:', err);
        setError('An error occurred while fetching diet plans');
      } finally {
        setLoading(false);
      }
    };

    fetchDietPlans();
  }, []);

  const filteredDietPlans = dietPlans.filter(plan => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'owned') return plan.dietPlan.creatorId === plan.userId;
    if (activeFilter === 'cloned') return plan.dietPlan.creatorId !== plan.userId;
    return true;
  });

  const toggleExpand = (planId: string) => {
    setExpandedPlanId(expandedPlanId === planId ? null : planId);
  };

  const renderPublishedStatus = (isPublished: boolean) => (
    <span className={`px-2 py-1 rounded-full text-xs ${
      isPublished 
        ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' 
        : 'bg-neutral-500/10 text-neutral-500 border border-neutral-500/20'
    }`}>
      {isPublished ? 'Published' : 'Draft'}
    </span>
  );

  const renderGoal = (plan: UserDietPlan) => (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Target className="w-4 h-4" />
      <span>{plan.dietPlan.goal}</span>
    </div>
  );

  const renderStatus = (plan: UserDietPlan) => {
    const getStatusColor = (status: DIET_PLAN_STATUS) => {
      switch (status) {
        case DIET_PLAN_STATUS.ACTIVE:
          return 'bg-green-500/10 text-green-500 border-green-500/20';
        case DIET_PLAN_STATUS.NEW:
          return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
        case DIET_PLAN_STATUS.NOT_ACTIVE:
          return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
        default:
          return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
      }
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(plan.status)}`}>
        {plan.status === DIET_PLAN_STATUS.ACTIVE ? 'Active' : 
         plan.status === DIET_PLAN_STATUS.NEW ? 'New' : 'Inactive'}
      </span>
    );
  };

  const handleDelete = async (planId: string) => {
    try {
      await DietPlanApis.deleteUserDietPlan(planId);
      // Remove the deleted plan from the state
      setDietPlans(prev => prev.filter(plan => plan.id !== planId));
      toast.success("Diet plan deleted successfully");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete diet plan");
    }
  };

  const toggleActivation = async (plan: UserDietPlan) => {
    console.log('🔄 Starting toggle activation for plan:', {
      id: plan.id,
      currentStatus: plan.status,
      currentActivatedAt: plan.activatedAt
    });

    try {
      // Optimistically update the local state
      const updatedPlans = dietPlans.map(p => {
        if (p.id === plan.id) {
          const newStatus = p.status === DIET_PLAN_STATUS.ACTIVE 
            ? DIET_PLAN_STATUS.NOT_ACTIVE 
            : DIET_PLAN_STATUS.ACTIVE;
          
          const updatedPlan = {
            ...p,
            status: newStatus,
            activatedAt: newStatus === DIET_PLAN_STATUS.ACTIVE ? new Date().toISOString() : p.activatedAt
          };
          
          console.log('📝 Optimistic update:', {
            id: p.id,
            oldStatus: p.status,
            newStatus: newStatus,
            oldActivatedAt: p.activatedAt,
            newActivatedAt: updatedPlan.activatedAt
          });
          
          return updatedPlan;
        }
        return p;
      });
      setDietPlans(updatedPlans);

      console.log('📤 Making API call to toggle activation...');
      // Make the API call using the DietPlanApis service
      const response = await DietPlanApis.toggleUserDietPlanActive(plan.id);
      
      console.log('📥 Received API response:', {
        success: response.success,
        data: response.data
      });
      
      if (!response.success || !response.data) {
        console.error('❌ API call failed:', response);
        throw new Error('Failed to toggle activation');
      }

      const updatedData = response.data;

      // Update with the actual server response
      setDietPlans(prevPlans => {
        const newPlans = prevPlans.map(p => {
          if (p.id === plan.id) {
            console.log('🔄 Updating plan with server response:', {
              id: p.id,
              oldStatus: p.status,
              newStatus: updatedData.status,
              oldActivatedAt: p.activatedAt,
              newActivatedAt: updatedData.activatedAt
            });
            return updatedData;
          }
          return p;
        });
        console.log('📊 Final plans state:', newPlans);
        return newPlans;
      });

      toast.success(`Diet plan ${updatedData.status === DIET_PLAN_STATUS.ACTIVE ? 'activated' : 'deactivated'} successfully`);
    } catch (error) {
      console.error('❌ Error in toggleActivation:', error);
      // Revert the optimistic update on error
      setDietPlans(dietPlans);
      toast.error('Failed to toggle diet plan activation');
    }
  };

  const renderDropdownMenu = (plan: UserDietPlan) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => toggleActivation(plan)}>
          {plan.status === DIET_PLAN_STATUS.ACTIVE ? (
            <>
              <PowerOff className="mr-2 h-4 w-4" />
              Deactivate
            </>
          ) : (
            <>
              <Power className="mr-2 h-4 w-4" />
              Activate
            </>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleDelete(plan.id)}>
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const renderPublishedStats = (plan: UserDietPlan) => (
    <div className="mt-4 pt-4 border-t border-border/50">
      <div className="grid grid-cols-4 gap-4">
        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4 text-rose-500" />
          <div>
            <div className="text-sm font-medium">{plan.dietPlan.likes || 0}</div>
            <div className="text-xs text-muted-foreground">Likes</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-amber-500" />
          <div>
            <div className="text-sm font-medium">
              {plan.dietPlan.averageRating ? plan.dietPlan.averageRating.toFixed(1) : '0.0'}
            </div>
            <div className="text-xs text-muted-foreground">
              {plan.dietPlan.ratingCount || 0} ratings
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Bookmark className="w-4 h-4 text-sky-500" />
          <div>
            <div className="text-sm font-medium">{plan.dietPlan.savedByUsers || 0}</div>
            <div className="text-xs text-muted-foreground">Saved</div>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header Bar */}
      <div className="flex items-center justify-between bg-background/50 backdrop-blur-xl border border-border rounded-xl p-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('cards')}
              className={`group relative overflow-hidden p-2 rounded-lg transition-all duration-300 cursor-pointer ${
                viewMode === 'cards' 
                  ? 'bg-sky-500/10 text-sky-400' 
                  : 'text-muted-foreground hover:bg-sky-500/5'
              }`}
            >
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
              </div>
              <div className="absolute w-8 h-8 rounded-full blur-lg bg-sky-500/20 transition-all duration-500 group-hover:bg-sky-500/30 group-hover:w-32 group-hover:-translate-x-4 group-hover:scale-y-125" />
              <LayoutGrid className="w-5 h-5 relative z-10 transition-all duration-300 group-hover:scale-110 group-hover:text-sky-300" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`group relative overflow-hidden p-2 rounded-lg transition-all duration-300 cursor-pointer ${
                viewMode === 'table' 
                  ? 'bg-sky-500/10 text-sky-400' 
                  : 'text-muted-foreground hover:bg-sky-500/5'
              }`}
            >
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
              </div>
              <div className="absolute w-8 h-8 rounded-full blur-lg bg-sky-500/20 transition-all duration-500 group-hover:bg-sky-500/30 group-hover:w-32 group-hover:-translate-x-4 group-hover:scale-y-125" />
              <Table2 className="w-5 h-5 relative z-10 transition-all duration-300 group-hover:scale-110 group-hover:text-sky-300" />
            </button>
          </div>
          <div className="h-6 w-px bg-border" />
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveFilter('all')}
              className={`group relative overflow-hidden px-4 py-2 rounded-lg text-sm transition-all duration-300 cursor-pointer ${
                activeFilter === 'all' 
                  ? 'bg-sky-500/10 text-sky-400' 
                  : 'text-muted-foreground hover:bg-sky-500/5'
              }`}
            >
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
              </div>
              <div className="absolute w-8 h-8 rounded-full blur-lg bg-sky-500/20 transition-all duration-500 group-hover:bg-sky-500/30 group-hover:w-32 group-hover:-translate-x-4 group-hover:scale-y-125" />
              <span className="relative z-10 transition-all duration-300 group-hover:scale-105 group-hover:text-sky-300">All</span>
            </button>
            <button
              onClick={() => setActiveFilter('owned')}
              className={`group relative overflow-hidden px-4 py-2 rounded-lg text-sm transition-all duration-300 cursor-pointer ${
                activeFilter === 'owned' 
                  ? 'bg-sky-500/10 text-sky-400' 
                  : 'text-muted-foreground hover:bg-sky-500/5'
              }`}
            >
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
              </div>
              <div className="absolute w-8 h-8 rounded-full blur-lg bg-sky-500/20 transition-all duration-500 group-hover:bg-sky-500/30 group-hover:w-32 group-hover:-translate-x-4 group-hover:scale-y-125" />
              <span className="relative z-10 transition-all duration-300 group-hover:scale-105 group-hover:text-sky-300">Owned</span>
            </button>
            <button
              onClick={() => setActiveFilter('cloned')}
              className={`group relative overflow-hidden px-4 py-2 rounded-lg text-sm transition-all duration-300 cursor-pointer ${
                activeFilter === 'cloned' 
                  ? 'bg-sky-500/10 text-sky-400' 
                  : 'text-muted-foreground hover:bg-sky-500/5'
              }`}
            >
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
              </div>
              <div className="absolute w-8 h-8 rounded-full blur-lg bg-sky-500/20 transition-all duration-500 group-hover:bg-sky-500/30 group-hover:w-32 group-hover:-translate-x-4 group-hover:scale-y-125" />
              <span className="relative z-10 transition-all duration-300 group-hover:scale-105 group-hover:text-sky-300">Cloned</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative group"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
        <div className="relative bg-background/50 backdrop-blur-xl border border-border rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/10">
              <Salad className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Your Diet Plans</h2>
          </div>

          {!filteredDietPlans || filteredDietPlans.length === 0 ? (
            <div className="relative">
              <div className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-2xl z-10 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-sky-500/10">
                    <Salad className="w-6 h-6 text-sky-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-sky-400">No {activeFilter} Diet Plans</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {activeFilter === 'all' 
                        ? "You haven't created or cloned any diet plans yet"
                        : activeFilter === 'owned'
                        ? "You haven't created any diet plans yet"
                        : "You haven't cloned any diet plans yet"}
                    </p>
                    <div className="mt-4 flex items-center justify-center gap-3">
                      <Link
                        href="/dietplan/create"
                        className="group relative overflow-hidden px-4 py-2 rounded-lg text-sm transition-all duration-300 cursor-pointer bg-sky-500/10 text-sky-400 hover:bg-sky-500/20"
                      >
                        <div className="absolute inset-0 overflow-hidden">
                          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                        </div>
                        <div className="absolute w-8 h-8 rounded-full blur-lg bg-sky-500/20 transition-all duration-500 group-hover:bg-sky-500/30 group-hover:w-32 group-hover:-translate-x-4 group-hover:scale-y-125" />
                        <span className="relative z-10 transition-all duration-300 group-hover:scale-105 group-hover:text-sky-300">
                          Create Diet Plan
                        </span>
                      </Link>
                      <Link
                        href="/dietplan/browse"
                        className="group relative overflow-hidden px-4 py-2 rounded-lg text-sm transition-all duration-300 cursor-pointer bg-white/5 text-muted-foreground hover:bg-white/10"
                      >
                        <div className="absolute inset-0 overflow-hidden">
                          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                        </div>
                        <div className="absolute w-8 h-8 rounded-full blur-lg bg-white/10 transition-all duration-500 group-hover:bg-white/20 group-hover:w-32 group-hover:-translate-x-4 group-hover:scale-y-125" />
                        <span className="relative z-10 transition-all duration-300 group-hover:scale-105 group-hover:text-white">
                          Browse Plans
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="blur-[2px]">
                {viewMode === 'cards' ? (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {/* Placeholder cards */}
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="p-4 rounded-lg border border-border bg-background/50">
                        <div className="h-6 w-3/4 bg-muted rounded mb-2" />
                        <div className="h-4 w-full bg-muted rounded mb-4" />
                        <div className="flex items-center justify-between">
                          <div className="h-4 w-1/4 bg-muted rounded" />
                          <div className="h-4 w-1/4 bg-muted rounded" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Name</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Duration</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Type</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Placeholder rows */}
                        {[1, 2, 3].map((i) => (
                          <tr key={i} className="border-b border-border/50">
                            <td className="py-3 px-4">
                              <div className="h-4 w-3/4 bg-muted rounded" />
                            </td>
                            <td className="py-3 px-4">
                              <div className="h-4 w-1/4 bg-muted rounded" />
                            </td>
                            <td className="py-3 px-4">
                              <div className="h-4 w-1/4 bg-muted rounded" />
                            </td>
                            <td className="py-3 px-4">
                              <div className="h-4 w-1/4 bg-muted rounded" />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          ) : viewMode === 'cards' ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredDietPlans.map((userDietPlan) => (
                <motion.div
                  key={userDietPlan.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 rounded-lg border border-border bg-background/50 hover:bg-background/80 transition-colors"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="space-y-1">
                      <h3 className="font-medium text-foreground">{userDietPlan.dietPlan?.name || 'Unknown'}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {userDietPlan.dietPlan?.description || "No description provided"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {renderPublishedStatus(userDietPlan.dietPlan?.isPublished || false)}
                      {renderDropdownMenu(userDietPlan)}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-border/50 my-3" />

                  {/* Content */}
                  <div className="space-y-3">
                    {/* Goal and Duration */}
                    <div className="flex items-center justify-between">
                      {renderGoal(userDietPlan)}
                      <span className="text-sm text-muted-foreground">
                        {userDietPlan.dietPlan?.durationInWeeks || 0} weeks
                      </span>
                    </div>

                    {/* Status and Last Active */}
                    <div className="flex items-center justify-between">
                      {renderStatus(userDietPlan)}
                      <span className="text-sm text-muted-foreground">
                        {userDietPlan.activatedAt ? getTimeAgo(userDietPlan.activatedAt) : 'Never active'}
                      </span>
                    </div>

                    {/* Type */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Type</span>
                      {userDietPlan.dietPlan?.creatorId === userDietPlan.userId ? (
                        <span className="flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-amber-500/10 text-amber-500 border border-amber-500/20">
                          <Crown className="w-3 h-3" />
                          Owned
                        </span>
                      ) : (
                        <span className="px-2 py-1 rounded-full text-xs bg-blue-500/10 text-blue-500 border border-blue-500/20">
                          Cloned
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Stats */}
                  {userDietPlan.dietPlan?.isPublished && (
                    <>
                      <div className="h-px bg-border/50 my-3" />
                      <div className="grid grid-cols-3 gap-4">
                        <div className="flex items-center gap-2">
                          <Heart className="w-4 h-4 text-rose-500" />
                          <div>
                            <div className="text-sm font-medium">{userDietPlan.dietPlan.likes || 0}</div>
                            <div className="text-xs text-muted-foreground">Likes</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-amber-500" />
                          <div>
                            <div className="text-sm font-medium">
                              {userDietPlan.dietPlan.averageRating ? userDietPlan.dietPlan.averageRating.toFixed(1) : '0.0'}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {userDietPlan.dietPlan.ratingCount || 0} ratings
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Bookmark className="w-4 h-4 text-sky-500" />
                          <div>
                            <div className="text-sm font-medium">{userDietPlan.dietPlan.savedByUsers || 0}</div>
                            <div className="text-xs text-muted-foreground">Saved</div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Name</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Goal</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Duration</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Last Active</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Type</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Published</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDietPlans.map((userDietPlan) => (
                    <tr key={userDietPlan.id} className="border-b border-border/50 hover:bg-background/50">
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium text-foreground">{userDietPlan.dietPlan?.name || 'Unknown'}</div>
                          <div className="text-sm text-muted-foreground">
                            {userDietPlan.dietPlan?.description || "No description provided"}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        {renderGoal(userDietPlan)}
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {userDietPlan.dietPlan?.durationInWeeks || 0} weeks
                      </td>
                      <td className="py-3 px-4">
                        {renderStatus(userDietPlan)}
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {userDietPlan.activatedAt ? getTimeAgo(userDietPlan.activatedAt) : 'Never'}
                      </td>
                      <td className="py-3 px-4">
                        {userDietPlan.dietPlan?.creatorId === userDietPlan.userId ? (
                          <span className="flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-amber-500/10 text-amber-500 border border-amber-500/20">
                            <Crown className="w-3 h-3" />
                            Owned
                          </span>
                        ) : (
                          <span className="px-2 py-1 rounded-full text-xs bg-blue-500/10 text-blue-500 border border-blue-500/20">
                            Cloned
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        {renderPublishedStatus(userDietPlan.dietPlan?.isPublished || false)}
                      </td>
                      <td className="py-3 px-4">
                        {renderDropdownMenu(userDietPlan)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
} 