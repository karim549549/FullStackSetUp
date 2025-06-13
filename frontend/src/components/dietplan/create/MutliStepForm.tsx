"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";
import Step1GoalMeals from "./Step1GoalMeals";
import Step2Cuisine from './Step2Cuisine'
import Step3UseProfile from "./Step3UseProfile";
import { ACTIVITY_LEVEL, DietFormProfile, GENDER } from "@/lib/types/profile.types";
import { useAuthStore } from "@/services/stores/authStore";
import { DietFormData } from "@/lib/types/diet.types";
import Step5Summary from "./Step5Summary";
import { motion } from "framer-motion";
import { profileValidationSchema } from "@/services/validations/profileValidationSchema";
import { ProfileApis } from "@/services/apis/profile.apis";
import { LOCAL_STORAGE_KEYS } from "@/lib/constants/localStorageKeys";

export default function DietMultiStepForm() {
  const { user } = useAuthStore();
  const [currStep, setCurrStep] = useState<number>(1);
  const totalSteps = 4;
  const [hasProfile, setHasProfile] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState<DietFormData>({
    goal: undefined,
    includeSnacks: false,
    durationInWeeks: 4,
    mealsPerDay: 3,
    cuisine: [],
    useProfile: false,
    profile: {
      weight: 0,
      height: 0,
      birthdate: '',
      gender: GENDER.MALE,
      activityLevel: ACTIVITY_LEVEL.LIGHTLY_ACTIVE,
      medications: [],
      foodIntolerances: [],
      smoke: false,
      vegetarian: false,
      vegan: false,
      halal: false,
      kosher: false,
    },
  });

  useEffect(() => {
    const checkProfileAndGuestData = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        const guestDietPlan = localStorage.getItem(LOCAL_STORAGE_KEYS.GUEST_DIET_PLAN);
        const expiryDate = localStorage.getItem(LOCAL_STORAGE_KEYS.GUEST_DIET_PLAN_EXPIRY);

        if (guestDietPlan && expiryDate) {
          const expiry = new Date(expiryDate);
          if (expiry > new Date()) {
            const savedData = JSON.parse(guestDietPlan);
            console.log(savedData);
            setFormData(savedData);
            localStorage.removeItem(LOCAL_STORAGE_KEYS.GUEST_DIET_PLAN);
            localStorage.removeItem(LOCAL_STORAGE_KEYS.GUEST_DIET_PLAN_EXPIRY);
            setCurrStep(3);
          } else {
            localStorage.removeItem(LOCAL_STORAGE_KEYS.GUEST_DIET_PLAN);
            localStorage.removeItem(LOCAL_STORAGE_KEYS.GUEST_DIET_PLAN_EXPIRY);
          }
        }
        const profile = await ProfileApis.getUserProfile();
        if (profile) {
          setHasProfile(true);
          setFormData(prev => ({
            ...prev,
            useProfile: true,
            profile: profile
          }));
        }
      } catch (error) {
        console.error('Error checking profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkProfileAndGuestData();
  }, [user]);

  const normalizeCuisinePercentages = (cuisines: DietFormData['cuisine']) => {
    if (cuisines.length === 0) return cuisines;
    
    const total = cuisines.reduce((sum, cuisine) => sum + cuisine.percentage, 0);
    
    // If total is not 100, normalize the percentages
    if (Math.abs(total - 100) > 0.01) { // Using small epsilon for floating point comparison
      const equalPercentage = 100 / cuisines.length;
      return cuisines.map(cuisine => ({
        ...cuisine,
        percentage: equalPercentage
      }));
    }
    
    return cuisines;
  };

  const isStepValid = () => {
    switch (currStep) {
      case 1:
        return !!formData.goal;
      case 2:
        return true; // No validation needed as we'll handle invalid cuisine distribution at summary
      case 3:
        if (!formData.useProfile) {
          // Validate required fields
          const { weight, height, birthdate, gender, activityLevel } = formData.profile;
          if (!weight || !height || !birthdate || !gender || !activityLevel) {
            return false;
          }
          const result = profileValidationSchema.safeParse(formData.profile);
          return result.success;
        }
        return true; // If using existing profile, no validation needed
      default:
        return true;
    }
  };

  const goToNext = () => {
    if (!isStepValid()) return;

    // If moving to summary step, normalize cuisine percentages if needed
    if (currStep === 3) {
      const total = formData.cuisine.reduce((sum, cuisine) => sum + cuisine.percentage, 0);
      if (Math.abs(total - 100) > 0.01) {
        const normalizedCuisines = normalizeCuisinePercentages(formData.cuisine);
        setFormData(prev => ({
          ...prev,
          cuisine: normalizedCuisines
        }));
      }
    }

    if (currStep < totalSteps) {
      setCurrStep((prev) => prev + 1);
    }
  };

  const goToPrev = () => {
    if (currStep > 1) setCurrStep((prev) => prev - 1);
  };

  const handleFormDataChange = <K extends keyof DietFormData>(
    key: K,
    value: DietFormData[K] 
  ) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleFormProfileData = <K extends keyof DietFormProfile>(
    key: K,
    value: DietFormProfile[K] 
  ) : void => {
    setFormData(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        [key]: value
      }
    }));
  };

  const renderStep = () => {
    switch (currStep) {
      case 1: return <Step1GoalMeals 
        handleFieldChange={handleFormDataChange}
        goal={formData.goal}
        includeSnacks={formData.includeSnacks}
        mealsPerDay={formData.mealsPerDay}
        durationInWeeks={formData.durationInWeeks}
      />;
      case 2: return <Step2Cuisine
        handleFieldChange={handleFormDataChange}
        cuisines={formData.cuisine}
      />;
      case 3: return <Step3UseProfile
        handleFieldChange={handleFormDataChange}
        useProfile={formData.useProfile}
      />;
      case 4: return <Step5Summary
        data={formData} />;
      default: return null;
    }
  };

  // Calculate progress based on current step
  const progress = (currStep / totalSteps) * 100;

  return (
    <section className="mt-5 flex items-center">
      <div className="flex flex-col w-full">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-500" />
          </div>
        ) : (
          <>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-fuchsia-500/10 rounded-full blur-3xl" />
              <div className="relative flex flex-col items-center">
                <div className="w-full max-w-3xl mx-auto">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center">
                          <span className="text-sm font-semibold text-violet-300">{currStep}</span>
                        </div>
                        <div className="absolute inset-0 bg-violet-500/20 rounded-full blur-lg animate-pulse" />
                      </div>
                      <span className="text-sm font-medium text-violet-300">
                        {currStep === 1 && "Set Your Goals"}
                        {currStep === 2 && "Choose Cuisines"}
                        {currStep === 3 && "Profile Information"}
                        {currStep === 4 && "Review & Generate"}
                      </span>
                    </div>
                    <span className="text-xs text-neutral-500">
                      {progress.toFixed(0)}% Complete
                    </span>
                  </div>
                  <div className="relative h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="h-full bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mx-auto w-full max-w-3xl mt-8">
              {currStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4"
                >
                  <div className="flex items-center gap-2 text-sm text-amber-500 bg-amber-500/10 p-3 rounded-lg">
                    <AlertCircle className="w-4 h-4" />
                    <span>Note: If your cuisine percentages don't sum to 100%, they will be automatically adjusted to equal percentages in the summary.</span>
                  </div>
                </motion.div>
              )}
              {renderStep()}
            </div>

            {currStep !== 4 && (
              <div className="flex justify-between p-3 mt-8">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={goToPrev}
                  disabled={currStep === 1}
                  className="group relative overflow-hidden px-6 py-2 flex items-center justify-center rounded-lg bg-white/5 text-neutral-300 transition-all duration-300 hover:bg-white/10 border border-white/10 hover:shadow-[0_0_15px_-3px_rgba(255,255,255,0.1)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white/5 disabled:hover:shadow-none"
                >
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                  </div>
                  <div className="absolute w-8 h-8 rounded-full blur-lg bg-white/10 transition-all duration-500 group-hover:bg-white/20 group-hover:w-36 group-hover:-translate-x-4 group-hover:scale-y-125" />
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  <span className="relative z-10 text-sm">Back</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={goToNext}
                  disabled={!isStepValid()}
                  className="group relative overflow-hidden px-6 flex items-center gap-2 rounded-lg bg-violet-500/10 text-violet-300 transition-all duration-300 hover:bg-violet-500/20 border border-violet-500/20 py-2 hover:shadow-[0_0_15px_-3px_rgba(124,58,237,0.3)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-violet-500/10 disabled:hover:shadow-none"
                >
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                  </div>
                  <div className="absolute w-8 h-8 rounded-full blur-lg bg-violet-500/20 transition-all duration-500 group-hover:bg-violet-500/30 group-hover:w-36 group-hover:-translate-x-4 group-hover:scale-y-125" />
                  <span className="relative z-10 text-sm">Next</span>
                  <ChevronRight className="w-4 h-4 relative z-10" />
                </motion.button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
