'use client';

import { motion } from "framer-motion";
import { Scale, Ruler, Calendar, Mars, Venus } from "lucide-react";
import { GENDER, ACTIVITY_LEVEL } from '@/lib/types/profile.types';
import { ProfileFormType } from '@/services/validations/profileValidationSchema';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Switch } from "@/components/ui/switch";

interface PersonalInfoProps {
  register: any;
  watch: any;
  errors: any;
  handleFieldChange: (key: keyof ProfileFormType, value: any) => void;
}

const activityLevels = [
  { value: ACTIVITY_LEVEL.SEDENTARY, label: 'Sedentary', description: 'Little or no exercise' },
  { value: ACTIVITY_LEVEL.LIGHTLY_ACTIVE, label: 'Lightly Active', description: 'Light exercise 1-3 days/week' },
  { value: ACTIVITY_LEVEL.MODERATELY_ACTIVE, label: 'Moderately Active', description: 'Moderate exercise 3-5 days/week' },
  { value: ACTIVITY_LEVEL.VERY_ACTIVE, label: 'Very Active', description: 'Hard exercise 6-7 days/week' },
  { value: ACTIVITY_LEVEL.EXTRA_ACTIVE, label: 'Extra Active', description: 'Very hard exercise & physical job' },
];

export default function PersonalInfo({ register, watch, errors, handleFieldChange }: PersonalInfoProps) {
  const handleNumberChange = (key: 'weight' | 'height', value: string) => {
    const numValue = value === '' ? '' : Number(value);
    handleFieldChange(key, numValue);
  };
  
  return (
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
                onCheckedChange={() => handleFieldChange('gender', watch('gender') === GENDER.MALE ? GENDER.FEMALE : GENDER.MALE)}
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
                      onClick={() => handleFieldChange('activityLevel', level.value)}
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
    </motion.div>
  );
} 