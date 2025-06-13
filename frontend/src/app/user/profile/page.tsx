"use client";

import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ProfileFormType, profileValidationSchema } from '@/services/validations/profileValidationSchema';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import PersonalInfo from '@/components/user/profile/PersonalInfo';
import HealthLifestyle from '@/components/user/profile/HealthLifestyle';
import { ProfileApis } from '@/services/apis/profile.apis';

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [existingProfile, setExistingProfile] = useState<ProfileFormType | null>(null);
  const [error, setError] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isDirty, isValid, isSubmitSuccessful },
  } = useForm<ProfileFormType>({
    resolver: zodResolver(profileValidationSchema) as any,
    mode: 'onBlur',
    defaultValues: {
      ...existingProfile ,
    },
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await ProfileApis.getUserProfile();
        if (profile) {
          const formattedProfile = {
            ...profile,
            birthdate: formatDate(profile.birthdate)
          };
          setExistingProfile(formattedProfile);
          reset(formattedProfile);
        }
        // Ensure loading state lasts at least 5 seconds
        await new Promise(resolve => setTimeout(resolve, 5000));
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to load profile');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [reset]);

  const onSubmit: SubmitHandler<ProfileFormType> = async (data) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await ProfileApis.createOrUpdateUserProfile(data);
      if (response.success) {
        const formattedProfile = {
          ...response.data,
          birthdate: formatDate(response.data.birthdate)
        };
        setExistingProfile(formattedProfile);
        reset(formattedProfile);
      } else {
        setError(response.message || 'Failed to update profile');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFieldChange = (key: keyof ProfileFormType, value: any) => {
    setValue(key, value, { shouldValidate: true });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto relative"
      >
        {(isLoading || isSubmitting) && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
              <p className="text-lg font-medium text-foreground">
                {isLoading ? 'Loading your profile...' : 'Updating your profile...'}
              </p>
              <p className="text-sm text-muted-foreground">Please wait while we process your information</p>
            </div>
          </div>
        )}

        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">Profile Settings</h1>
            <p className="text-sm text-muted-foreground">
              {existingProfile 
                ? 'Update your profile information to get personalized diet plans and recommendations.'
                : 'Complete your profile to get personalized diet plans and recommendations.'}
            </p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {!existingProfile && !isSubmitSuccessful && (
            <Alert variant="destructive">
              <AlertTitle>Profile Incomplete</AlertTitle>
              <AlertDescription>
                Please complete your profile to get personalized diet recommendations and better meal plans.
              </AlertDescription>
            </Alert>
          )}

          {isSubmitSuccessful && (
            <Alert className="bg-green-500/10 border-green-500/20">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <AlertTitle className="text-green-500">Profile Updated</AlertTitle>
              <AlertDescription className="text-green-500/90">
                Thank you for updating your profile! You'll now receive personalized diet recommendations and meal plans.
              </AlertDescription>
            </Alert>
          )}

          {!isValid && isDirty && (
            <Alert variant="destructive">
              <AlertDescription>
                Please fill in all required fields correctly to complete your profile.
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <PersonalInfo
              register={register}
              watch={watch}
              errors={errors}
              handleFieldChange={handleFieldChange}
            />

            <HealthLifestyle
              medications={watch('medications') || []}
              foodIntolerances={watch('foodIntolerances') || []}
              smoke={watch('smoke') || false}
              vegetarian={watch('vegetarian') || false}
              vegan={watch('vegan') || false}
              halal={watch('halal') || false}
              kosher={watch('kosher') || false}
              handleFieldChange={handleFieldChange}
            />

            <div className="flex justify-end gap-4">
              <Button
                type="submit"
                disabled={!isValid || isSubmitting}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isValid
                    ? 'bg-sky-500 text-white hover:bg-sky-600'
                    : 'bg-muted text-muted-foreground cursor-not-allowed'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                    <span>Updating...</span>
                  </div>
                ) : (
                  existingProfile ? 'Update Profile' : 'Complete Profile'
                )}
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}