"use client";
import { DietFormData } from "@/lib/types/diet.types"
import { 
  Target, 
  ChefHat, 
  User, 
  Pill, 
  AlertTriangle, 
  UserCheck,
  ChevronRight,
  Loader2
} from "lucide-react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuthStore } from '@/services/stores/authStore';
import { LOCAL_STORAGE_KEYS } from '@/lib/constants/localStorageKeys';
import { DietPlanApis } from '@/services/apis/dietplan.apis';

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional() ,
});

type FormData = z.infer<typeof formSchema>;

interface SummaryStepProps {
  data: DietFormData;
}

export default function Step5Summary({ data }: SummaryStepProps) {
  const { user } = useAuthStore();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);

  // Simulate progress for better UX
  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      if (isGenerating) {
        progress = Math.min(progress + 1, 90); // Cap at 90% until complete
        setGenerationProgress(progress);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isGenerating]);

  const onSubmit = async (formData: FormData) => {
    if (!user) {
      // Store diet plan data in localStorage for guest users
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 1); // 1 day expiry

      localStorage.setItem(LOCAL_STORAGE_KEYS.GUEST_DIET_PLAN, JSON.stringify({
        ...data,
        name: formData.name,
        description: formData.description || '',
      }));
      localStorage.setItem(LOCAL_STORAGE_KEYS.GUEST_DIET_PLAN_EXPIRY, expiryDate.toISOString());

      // Redirect to login
      router.push('/auth/login');
      return;
    }

    setIsGenerating(true);
    try {
      const completeData = {
        ...data,
        name: formData.name,
        description: formData.description || '',
      };
      
      const response = await DietPlanApis.generateDietPlan(completeData);
      
      if (response.success) {
        setGenerationProgress(100);
        // Redirect to diets page
        router.push('/user/diet-recipe/diets');
      } else {
        throw new Error(response.message || 'Failed to generate diet plan');
      }
    } catch (error) {
      console.error('Error generating diet plan:', error);
      // TODO: Add error handling UI feedback
    } finally {
      setIsGenerating(false);
    }
  };

  const handleNameBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    if (!value) {
      setValue("name", "My Diet Plan");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">Review Your Diet Plan</h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Please review your selections and provide a name for your diet plan.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Diet Plan Name <span className="text-red-500">*</span>
            </label>
            <input
              {...register("name")}
              onBlur={handleNameBlur}
              type="text"
              id="name"
              placeholder="Enter a name for your diet plan"
              className="w-full px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Description (Optional)
            </label>
            <textarea
              {...register("description")}
              id="description"
              placeholder="Add a description for your diet plan"
              className="w-full px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 focus:ring-2 focus:ring-violet-500 focus:border-transparent min-h-[100px]"
            />
          </div>
        </div>

        <div className="grid gap-6">
          {/* Goals Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50"
          >
            <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-violet-500" />
              Goals & Preferences
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-neutral-600 dark:text-neutral-400">Goal</span>
                <span className="font-medium text-neutral-900 dark:text-neutral-100">{data.goal}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-600 dark:text-neutral-400">Duration</span>
                <span className="font-medium text-neutral-900 dark:text-neutral-100">{data.durationInWeeks} weeks</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-600 dark:text-neutral-400">Meals per day</span>
                <span className="font-medium text-neutral-900 dark:text-neutral-100">{data.mealsPerDay}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-600 dark:text-neutral-400">Include snacks</span>
                <span className="font-medium text-neutral-900 dark:text-neutral-100">{data.includeSnacks ? 'Yes' : 'No'}</span>
              </div>
            </div>
          </motion.div>

          {/* Cuisine Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50"
          >
            <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-4 flex items-center gap-2">
              <ChefHat className="w-5 h-5 text-violet-500" />
              Selected Cuisines
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.cuisine.map((cuisine) => (
                <span
                  key={cuisine.name}
                  className="px-3 py-1 rounded-full text-sm bg-violet-500/10 text-violet-500 border border-violet-500/20"
                >
                  {cuisine.name} ({cuisine.percentage}%)
                </span>
              ))}
            </div>
          </motion.div>

          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50"
          >
            <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-violet-500" />
              Profile Information
            </h3>
            {data.useProfile ? (
              <div className="flex items-center gap-2 text-violet-500">
                <UserCheck className="w-5 h-5" />
                <span>Using existing profile data</span>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-600 dark:text-neutral-400">Weight</span>
                  <span className="font-medium text-neutral-900 dark:text-neutral-100">{data.profile.weight} kg</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-600 dark:text-neutral-400">Height</span>
                  <span className="font-medium text-neutral-900 dark:text-neutral-100">{data.profile.height} cm</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-600 dark:text-neutral-400">Gender</span>
                  <span className="font-medium text-neutral-900 dark:text-neutral-100">{data.profile.gender}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-600 dark:text-neutral-400">Activity Level</span>
                  <span className="font-medium text-neutral-900 dark:text-neutral-100">{data.profile.activityLevel}</span>
                </div>
                {data.profile.medications.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-neutral-600 dark:text-neutral-400 flex items-center gap-2">
                      <Pill className="w-4 h-4" />
                      Medications
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {data.profile.medications.map((med) => (
                        <span
                          key={med}
                          className="px-3 py-1 rounded-full text-sm bg-amber-500/10 text-amber-500 border border-amber-500/20"
                        >
                          {med}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {data.profile.foodIntolerances.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-neutral-600 dark:text-neutral-400 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      Food Intolerances
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {data.profile.foodIntolerances.map((intolerance) => (
                        <span
                          key={intolerance}
                          className="px-3 py-1 rounded-full text-sm bg-red-500/10 text-red-500 border border-red-500/20"
                        >
                          {intolerance}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex flex-wrap gap-2">
                  {data.profile.vegetarian && (
                    <span className="px-3 py-1 rounded-full text-sm bg-green-500/10 text-green-500 border border-green-500/20">
                      Vegetarian
                    </span>
                  )}
                  {data.profile.vegan && (
                    <span className="px-3 py-1 rounded-full text-sm bg-green-500/10 text-green-500 border border-green-500/20">
                      Vegan
                    </span>
                  )}
                  {data.profile.halal && (
                    <span className="px-3 py-1 rounded-full text-sm bg-blue-500/10 text-blue-500 border border-blue-500/20">
                      Halal
                    </span>
                  )}
                  {data.profile.kosher && (
                    <span className="px-3 py-1 rounded-full text-sm bg-blue-500/10 text-blue-500 border border-blue-500/20">
                      Kosher
                    </span>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>

        <div className="flex gap-4 items-center justify-center">
          <button
            type="submit"
            className="group cursor-pointer relative overflow-hidden px-8 flex items-center gap-2 rounded-lg bg-violet-500/10 text-violet-300 transition-all duration-300 hover:bg-violet-500/20 border border-violet-500/20 py-3 hover:shadow-[0_0_15px_-3px_rgba(124,58,237,0.3)] w-fit"
          >
            <div className="absolute w-fit inset-0 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
            </div>
            <div className="absolute w-10 h-10 rounded-full blur-lg bg-violet-500/20 transition-all duration-500 group-hover:bg-violet-500/30 group-hover:w-48 group-hover:-translate-x-6 group-hover:scale-y-125" />
            <span className="relative z-10 transition-all duration-300 group-hover:text-violet-200 group-hover:drop-shadow-[0_0_5px_rgba(167,139,250,0.3)]">
              Generate Diet Plan
            </span>
            <div className="relative z-10 transition-all duration-500 group-hover:translate-x-3 group-hover:scale-110">
              <ChevronRight className="w-5 h-5 text-violet-400 transition-all duration-300 group-hover:text-violet-200 group-hover:scale-110" />
            </div>
          </button>
          <Link href="/">
            <button
              type="button"
              className="group cursor-pointer relative overflow-hidden px-8 py-3 flex items-center justify-center rounded-lg bg-white/5 text-neutral-300 transition-all duration-300 hover:bg-white/10 border border-white/10 hover:shadow-[0_0_15px_-3px_rgba(255,255,255,0.1)] w-fit"
            >
              <div className="absolute w-fit inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
              </div>
              <div className="absolute w-10 h-10 rounded-full blur-lg bg-white/10 transition-all duration-500 group-hover:bg-white/20 group-hover:w-48 group-hover:-translate-x-6 group-hover:scale-y-125" />
              <span className="relative z-10 transition-all duration-300 group-hover:text-white group-hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">
                Cancel
              </span>
            </button>
          </Link>
        </div>
      </form>

      {isGenerating && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <div className="bg-white dark:bg-neutral-900 p-8 rounded-xl max-w-md w-full mx-4 space-y-6">
            <div className="flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-violet-500 animate-spin" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
                Generating Your Diet Plan
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                This may take a few minutes. Please don't close this window.
              </p>
            </div>
            <div className="w-full bg-neutral-200 dark:bg-neutral-800 rounded-full h-2">
              <div
                className="bg-violet-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${generationProgress}%` }}
              />
            </div>
            <p className="text-center text-sm text-neutral-600 dark:text-neutral-400">
              {generationProgress}% Complete
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
