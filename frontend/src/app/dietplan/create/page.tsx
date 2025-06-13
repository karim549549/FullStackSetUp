import MainNavbar from '@/components/custom/MainNavbar';
import DietMultiStepForm from '@/components/dietplan/create/MutliStepForm';
import React from 'react'

export default function DietPlanCreatePage() {
  return (
    <>
      <header>
        <MainNavbar />
      </header>
      <section className="min-h-[88vh] p-5 relative">
        {/* Background Elements */}
        <div className="absolute inset-0 dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] dark:from-violet-500/10 dark:via-background dark:to-background bg-gradient-to-b from-sky-50 to-white" />
        <div className="absolute top-0 right-0 w-1/2 h-1/2 dark:bg-violet-500/5 bg-violet-100 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 dark:bg-sky-500/5 bg-sky-100 rounded-full blur-3xl" />
        
        {/* Main Content */}
        <div className="container mx-auto max-w-4xl relative">
          <div className="relative rounded-2xl overflow-hidden">
            {/* Card Background - Different for dark/light modes */}
            <div className="absolute inset-0 dark:bg-white/[0.02] dark:backdrop-blur-xl dark:border-white/5 bg-white shadow-lg border border-zinc-100" />
            
            {/* Content */}
            <div className="relative p-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold dark:text-white text-zinc-900">
                  Personalized Diet Plan Assistant
                </h1>
                <p className="mt-3 dark:text-neutral-400 text-zinc-600 text-lg">
                  Let&apos;s create your perfect nutrition plan together!
                </p>
              </div>
              
              <div className="relative">
                <DietMultiStepForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
