"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { User, UserPlus, UserCheck, AlertCircle, LogIn, Scale, Ruler, Calendar, Mars, Venus, Search, X, Ban, Leaf, Star, CheckCircle2 } from 'lucide-react';
import { useAuthStore } from '@/services/stores/authStore';
import Link from 'next/link';
import { DietFormData } from '@/lib/types/diet.types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileValidationSchema, ProfileFormType } from '@/services/validations/profileValidationSchema';
import { GENDER, ACTIVITY_LEVEL, MEDICATION, FOOD_INTOLERANCE } from '@/lib/types/profile.types';
import { Switch } from "@/components/ui/switch";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface Step3UseProfileProps {
  handleFieldChange: <K extends keyof DietFormData>(key: K, value: DietFormData[K]) => void;
  useProfile: boolean;
}

const activityLevels = [
  { value: ACTIVITY_LEVEL.SEDENTARY, label: 'Sedentary', description: 'Little or no exercise' },
  { value: ACTIVITY_LEVEL.LIGHTLY_ACTIVE, label: 'Lightly Active', description: 'Light exercise 1-3 days/week' },
  { value: ACTIVITY_LEVEL.MODERATELY_ACTIVE, label: 'Moderately Active', description: 'Moderate exercise 3-5 days/week' },
  { value: ACTIVITY_LEVEL.VERY_ACTIVE, label: 'Very Active', description: 'Hard exercise 6-7 days/week' },
  { value: ACTIVITY_LEVEL.EXTRA_ACTIVE, label: 'Extra Active', description: 'Very hard exercise & physical job' },
];

export default function Step3UseProfile({ handleFieldChange, useProfile }: Step3UseProfileProps) {
  const { user } = useAuthStore();
  const hasProfile = !!user;

  const [showMedDropdown, setShowMedDropdown] = useState(false);
  const [showFoodDropdown, setShowFoodDropdown] = useState(false);
  const [medSearch, setMedSearch] = useState('');
  const [foodSearch, setFoodSearch] = useState('');
  const [filteredMeds, setFilteredMeds] = useState<MEDICATION[]>([]);
  const [filteredFoods, setFilteredFoods] = useState<FOOD_INTOLERANCE[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProfileFormType>({
    resolver: zodResolver(profileValidationSchema) as any,
    mode: 'onBlur',
    defaultValues: {
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
    // If user has no profile, force useProfile to false
    if (!hasProfile && useProfile) {
      handleFieldChange('useProfile', false);
    }
  }, [hasProfile, useProfile, handleFieldChange]);

  useEffect(() => {
    const filteredMeds = Object.values(MEDICATION).filter(med =>
      med.toLowerCase().includes(medSearch.toLowerCase()) &&
      !watch('medications')?.includes(med)
    );
    setFilteredMeds(filteredMeds);

    const filteredFoods = Object.values(FOOD_INTOLERANCE).filter(food =>
      food.toLowerCase().includes(foodSearch.toLowerCase()) &&
      !watch('foodIntolerances')?.includes(food)
    );
    setFilteredFoods(filteredFoods);
  }, [medSearch, foodSearch, watch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.medication-dropdown')) {
        setShowMedDropdown(false);
      }
      if (!target.closest('.food-dropdown')) {
        setShowFoodDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleProfileChoice = (useExisting: boolean) => {
    handleFieldChange('useProfile', useExisting);
  };

  const handleNumberChange = (key: 'weight' | 'height', value: string) => {
    const numValue = value === '' ? 0 : Number(value);
    setValue(key, numValue, { shouldValidate: true });
    handleFieldChange('profile', { ...watch(), [key]: numValue });
  };

  const handleFieldUpdate = (key: keyof ProfileFormType, value: any) => {
    setValue(key, value, { shouldValidate: true });
    handleFieldChange('profile', { ...watch(), [key]: value });
  };

  const handleMedSelect = (med: MEDICATION) => {
    const newMeds = watch('medications')?.includes(med)
      ? watch('medications')?.filter(m => m !== med)
      : [...(watch('medications') || []), med];
    handleFieldUpdate('medications', newMeds);
    setShowMedDropdown(false);
  };

  const handleMedRemove = (med: MEDICATION) => {
    const newMeds = watch('medications')?.filter(m => m !== med) || [];
    handleFieldUpdate('medications', newMeds);
  };

  const handleFoodSelect = (food: FOOD_INTOLERANCE) => {
    const newFoods = watch('foodIntolerances')?.includes(food)
      ? watch('foodIntolerances')?.filter(f => f !== food)
      : [...(watch('foodIntolerances') || []), food];
    handleFieldUpdate('foodIntolerances', newFoods);
    setShowFoodDropdown(false);
  };

  const handleFoodRemove = (food: FOOD_INTOLERANCE) => {
    const newFoods = watch('foodIntolerances')?.filter(f => f !== food) || [];
    handleFieldUpdate('foodIntolerances', newFoods);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">Profile Selection</h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Choose whether to use your existing profile or enter new information for this diet plan.
        </p>
      </div>

      {!hasProfile && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <div className="flex items-center gap-2 text-sm text-amber-500 bg-amber-500/10 p-3 rounded-lg">
            <AlertCircle className="w-4 h-4" />
            <span>You're currently browsing as a guest. You can continue without a profile.</span>
          </div>
          
          <Link 
            href="/auth/login"
            className="flex items-center gap-2 text-sm text-violet-500 bg-violet-500/10 p-3 rounded-lg hover:bg-violet-500/20 transition-colors cursor-pointer"
          >
            <LogIn className="w-4 h-4" />
            <span>Sign in for a better experience with saved profiles and progress tracking</span>
          </Link>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleProfileChoice(true)}
          disabled={!hasProfile}
          className={`group relative p-6 rounded-xl border transition-all duration-300 ${
            useProfile
              ? 'bg-violet-500/10 border-violet-500/30 shadow-[0_0_15px_-3px_rgba(124,58,237,0.3)]'
              : 'bg-white/5 dark:bg-white/5 border-white/10 hover:border-violet-500/20 hover:bg-violet-500/5'
          } ${!hasProfile ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          <div className="absolute inset-0 overflow-hidden rounded-xl">
            <div className={`absolute inset-0 bg-gradient-to-r from-violet-500/10 via-pink-500/10 to-blue-500/10 opacity-0 transition-opacity duration-300 ${
              useProfile ? 'opacity-100' : 'group-hover:opacity-50'
            }`} />
          </div>
          <div className="relative flex flex-col items-center text-center space-y-4">
            <div className={`p-4 rounded-lg transition-colors duration-300 ${
              useProfile ? 'bg-violet-500/20' : 'bg-white/10 group-hover:bg-white/20'
            }`}>
              <UserCheck className="w-8 h-8 text-violet-500" />
            </div>
            <div>
              <h3 className="font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                Use Existing Profile
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Use your saved profile information for personalized recommendations
              </p>
            </div>
          </div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleProfileChoice(false)}
          className={`group relative p-6 rounded-xl border transition-all duration-300 cursor-pointer ${
            !useProfile
              ? 'bg-violet-500/10 border-violet-500/30 shadow-[0_0_15px_-3px_rgba(124,58,237,0.3)]'
              : 'bg-white/5 dark:bg-white/5 border-white/10 hover:border-violet-500/20 hover:bg-violet-500/5'
          }`}
        >
          <div className="absolute inset-0 overflow-hidden rounded-xl">
            <div className={`absolute inset-0 bg-gradient-to-r from-violet-500/10 via-pink-500/10 to-blue-500/10 opacity-0 transition-opacity duration-300 ${
              !useProfile ? 'opacity-100' : 'group-hover:opacity-50'
            }`} />
          </div>
          <div className="relative flex flex-col items-center text-center space-y-4">
            <div className={`p-4 rounded-lg transition-colors duration-300 ${
              !useProfile ? 'bg-violet-500/20' : 'bg-white/10 group-hover:bg-white/20'
            }`}>
              <UserPlus className="w-8 h-8 text-violet-500" />
            </div>
            <div>
              <h3 className="font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                Enter New Information
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Provide information specific to this diet plan
              </p>
            </div>
          </div>
        </motion.button>
      </div>

      {hasProfile && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 p-4 rounded-xl bg-white/5 dark:bg-white/5 border border-white/10"
        >
          <div className="p-2 rounded-lg bg-white/10">
            <User className="w-5 h-5 text-violet-500" />
          </div>
          <div>
            <h3 className="font-medium text-neutral-900 dark:text-neutral-100">Current Profile</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {user.email} • {user.name}
            </p>
          </div>
        </motion.div>
      )}

      {!useProfile && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
          <div className="relative bg-card border border-border rounded-2xl p-6">
            <h2 className="text-base font-semibold text-foreground mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Weight Input */}
              <div className="space-y-2">
                <label className="block text-xs font-medium text-muted-foreground">
                  Weight (kg) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Scale className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <input
                    min={30}
                    max={300}
                    type="number"
                    {...register('weight', {
                      setValueAs: (v: string) => v === '' ? '' : Number(v)
                    })}
                    onChange={(e) => handleNumberChange('weight', e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your weight"
                  />
                </div>
                {errors.weight && (
                  <p className="text-xs text-red-500">{errors.weight.message}</p>
                )}
              </div>

              {/* Height Input */}
              <div className="space-y-2">
                <label className="block text-xs font-medium text-muted-foreground">
                  Height (cm) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Ruler className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <input
                    type="number"
                    min={100}
                    max={250}
                    {...register('height', {
                      setValueAs: (v: string) => v === '' ? '' : Number(v)
                    })}
                    onChange={(e) => handleNumberChange('height', e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your height"
                  />
                </div>
                {errors.height && (
                  <p className="text-xs text-red-500">{errors.height.message}</p>
                )}
              </div>

              {/* Birthdate Input */}
              <div className="space-y-2">
                <label className="block text-xs font-medium text-muted-foreground">
                  Birthdate <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <input
                    type="date"
                    {...register('birthdate')}
                    className="block w-full pl-10 pr-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                      }
                    }}
                  />
                </div>
                {errors.birthdate && (
                  <p className="text-xs text-red-500">{errors.birthdate.message}</p>
                )}
              </div>

              {/* Gender Switch */}
              <div className="space-y-2">
                <label className="block text-xs font-medium text-muted-foreground">
                  Gender <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-4 p-3 rounded-lg border border-border bg-background">
                  <Switch
                    checked={watch('gender') === GENDER.MALE}
                    onCheckedChange={() => handleFieldUpdate('gender', watch('gender') === GENDER.MALE ? GENDER.FEMALE : GENDER.MALE)}
                    className="cursor-pointer"
                  />
                  <div className="flex items-center gap-2">
                    {watch('gender') === GENDER.MALE ? (
                      <>
                        <Mars className="w-4 h-4 text-red-500" />
                        <span className="text-sm font-medium">Male</span>
                      </>
                    ) : (
                      <>
                        <Venus className="w-4 h-4 text-blue-500" />
                        <span className="text-sm font-medium">Female</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Activity Level Select */}
              <div className="space-y-2 md:col-span-2">
                <label className="block text-xs font-medium text-muted-foreground">
                  Activity Level <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {activityLevels.map((level) => (
                    <HoverCard key={level.value}>
                      <HoverCardTrigger asChild>
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleFieldUpdate('activityLevel', level.value)}
                          className={`p-3 rounded-lg border transition-all duration-200 cursor-pointer ${
                            watch('activityLevel') === level.value
                              ? 'bg-sky-500/10 border-sky-500/30 shadow-[0_0_15px_-3px_rgba(14,165,233,0.3)]'
                              : 'bg-background/5 border-border hover:border-sky-500/20 hover:bg-sky-500/5'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div className="text-left">
                              <div className="text-xs font-medium text-foreground">{level.label}</div>
                              <div className="text-xs text-muted-foreground">{level.description}</div>
                            </div>
                          </div>
                        </motion.button>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80">
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-foreground">
                            {level.label}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {level.description}
                          </p>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Health & Lifestyle Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative group mt-6"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
            <div className="relative bg-card border border-border rounded-2xl p-6">
              <h2 className="text-base font-semibold text-foreground mb-4">Health & Lifestyle (Optional)</h2>
              <div className="space-y-6">
                {/* Medications */}
                <div className="space-y-3">
                  <label className="block text-xs font-medium text-muted-foreground">
                    Medications 
                  </label>
                  <div className="relative medication-dropdown">
                    <div
                      onClick={() => setShowMedDropdown(!showMedDropdown)}
                      className="flex items-center gap-2 border border-border rounded-lg px-4 py-2 cursor-text bg-background hover:border-sky-500/50 transition-colors"
                    >
                      <Search className="w-4 h-4 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Search medications..."
                        className="bg-transparent text-sm outline-none w-full"
                        value={medSearch}
                        onChange={(e) => {
                          setMedSearch(e.target.value);
                          setShowMedDropdown(true);
                        }}
                      />
                    </div>

                    {showMedDropdown && (
                      <ul className="absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-lg bg-card border border-border shadow-lg">
                        {filteredMeds.length > 0 ? (
                          filteredMeds.map((med) => (
                            <li
                              key={med}
                              className="px-4 py-2 text-sm hover:bg-sky-500/10 cursor-pointer"
                              onClick={() => handleMedSelect(med)}
                            >
                              {med}
                            </li>
                          ))
                        ) : (
                          <li className="px-4 py-2 text-sm text-muted-foreground">No results found.</li>
                        )}
                      </ul>
                    )}
                  </div>

                  {watch('medications')?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {watch('medications')?.map((med) => (
                        <span
                          key={med}
                          className="flex items-center gap-1 text-sm px-2 py-1 border border-sky-500/30 bg-sky-500/10 text-sky-300 rounded-full"
                        >
                          {med}
                          <button
                            onClick={() => handleMedRemove(med)}
                            className="text-sky-300 hover:text-sky-400"
                          >
                            <X size={12} />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Food Intolerances */}
                <div className="space-y-3">
                  <label className="block text-xs font-medium text-muted-foreground">
                    Food Intolerances (Optional)
                  </label>
                  <div className="relative food-dropdown">
                    <div
                      onClick={() => setShowFoodDropdown(!showFoodDropdown)}
                      className="flex items-center gap-2 border border-border rounded-lg px-4 py-2 cursor-text bg-background hover:border-sky-500/50 transition-colors"
                    >
                      <Search className="w-4 h-4 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Search food intolerances..."
                        className="bg-transparent text-sm outline-none w-full"
                        value={foodSearch}
                        onChange={(e) => {
                          setFoodSearch(e.target.value);
                          setShowFoodDropdown(true);
                        }}
                      />
                    </div>

                    {showFoodDropdown && (
                      <ul className="absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-lg bg-card border border-border shadow-lg">
                        {filteredFoods.length > 0 ? (
                          filteredFoods.map((food) => (
                            <li
                              key={food}
                              className="px-4 py-2 text-sm hover:bg-sky-500/10 cursor-pointer"
                              onClick={() => handleFoodSelect(food)}
                            >
                              {food}
                            </li>
                          ))
                        ) : (
                          <li className="px-4 py-2 text-sm text-muted-foreground">No results found.</li>
                        )}
                      </ul>
                    )}
                  </div>

                  {watch('foodIntolerances')?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {watch('foodIntolerances')?.map((food) => (
                        <span
                          key={food}
                          className="flex items-center gap-1 text-sm px-2 py-1 border border-sky-500/30 bg-sky-500/10 text-sky-300 rounded-full"
                        >
                          {food}
                          <button
                            onClick={() => handleFoodRemove(food)}
                            className="text-sky-300 hover:text-sky-400"
                          >
                            <X size={12} />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Smoking Status */}
                <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-background">
                  <div className="flex items-center gap-2">
                    <Ban className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs font-medium text-foreground">Do you smoke? (Optional)</span>
                  </div>
                  <Switch
                    checked={watch('smoke')}
                    onCheckedChange={(checked) => handleFieldUpdate('smoke', checked)}
                    className="cursor-pointer"
                  />
                </div>

                {/* Dietary Preferences */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { name: 'vegetarian', label: 'Vegetarian', icon: Leaf, value: watch('vegetarian') },
                    { name: 'vegan', label: 'Vegan', icon: Star, value: watch('vegan') },
                    { name: 'halal', label: 'Halal', icon: CheckCircle2, value: watch('halal') },
                    { name: 'kosher', label: 'Kosher', icon: CheckCircle2, value: watch('kosher') },
                  ].map((pref) => (
                    <motion.label
                      key={pref.name}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center gap-2 p-3 rounded-lg border border-border bg-background cursor-pointer hover:border-sky-500/20 hover:bg-sky-500/5 transition-all duration-200"
                    >
                      <input
                        type="checkbox"
                        checked={pref.value}
                        onChange={(e) => handleFieldUpdate(pref.name as keyof ProfileFormType, e.target.checked)}
                        className="w-4 h-4 text-sky-500 border-border rounded focus:ring-sky-500 cursor-pointer"
                      />
                      <pref.icon className="w-4 h-4 text-muted-foreground" />
                      <span className="text-xs font-medium text-foreground">{pref.label}</span>
                    </motion.label>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
