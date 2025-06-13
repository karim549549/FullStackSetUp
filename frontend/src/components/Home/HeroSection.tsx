"use client";
import React  from 'react'
import Link from 'next/link'
import { ChevronRight, Brain, Target, ChartBar, Clock } from 'lucide-react'
import { TextGenerateEffect } from '@/components/custom/TextGenerateEffect';
import { AuraBackground } from '@/components/custom/AuraBackground';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const features = [
    {
      icon: <Brain className="w-6 h-6 text-violet-500" />,
      title: "AI-Powered Analysis",
      description: "Advanced algorithms analyze your body composition, activity level, and goals to create the perfect plan."
    },
    {
      icon: <Target className="w-6 h-6 text-pink-500" />,
      title: "Personalized Goals",
      description: "Customized nutrition plans that adapt to your specific fitness goals and dietary preferences."
    },
    {
      icon: <ChartBar className="w-6 h-6 text-blue-500" />,
      title: "Progress Tracking",
      description: "Monitor your journey with detailed analytics and real-time progress updates."
    },
    {
      icon: <Clock className="w-6 h-6 text-violet-500" />,
      title: "Time-Saving",
      description: "Automated meal planning and grocery lists save you hours every week."
    }
  ];

  return (
    <AuraBackground className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative z-0">
        {/* Hero Content */}
        <motion.div
            initial={{ opacity: 0.0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
            duration: 0.8,
            ease: "easeInOut",
            }}
            className='flex flex-col items-center gap-5'
        >
            <div className='flex flex-col text-center items-center'>
                <TextGenerateEffect 
                    words='Transform Your Health with AI-Powered Nutrition'  
                    className='text-4xl md:text-6xl max-w-[40ch] font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-violet-500 via-pink-500 to-blue-500' 
                />
                <p className="text-lg text-neutral-400 max-w-3xl mx-auto mb-8">
                    Get personalized diet plans tailored to your body, goals, and preferences. Our AI analyzes hundreds of factors to create your perfect eating strategy.
                </p>
            </div>
            <div className="flex gap-6 justify-center mb-16">
                <Link
                href="/dietplan/create"
                className="group relative overflow-hidden px-8 flex items-center gap-2 rounded-lg bg-violet-500/10 text-violet-300 transition-all duration-300 hover:bg-violet-500/20 border border-violet-500/20 py-3 hover:shadow-[0_0_15px_-3px_rgba(124,58,237,0.3)]"
                >
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                    </div>
                    <div className="absolute w-10 h-10 rounded-full blur-lg bg-violet-500/20 transition-all duration-500 group-hover:bg-violet-500/30 group-hover:w-48 group-hover:-translate-x-6 group-hover:scale-y-125" />
                    <span className="relative z-10 transition-all duration-300 group-hover:text-violet-200 group-hover:drop-shadow-[0_0_5px_rgba(167,139,250,0.3)]">
                        Get Started
                    </span>
                    <div className="relative z-10 transition-all duration-500 group-hover:translate-x-3 group-hover:scale-110">
                        <ChevronRight className="w-5 h-5 text-violet-400 transition-all duration-300 group-hover:text-violet-200 group-hover:scale-110" />
                    </div>
                </Link>
                <Link
                href="/about"
                className="group relative overflow-hidden px-8 py-3 flex items-center justify-center rounded-lg bg-white/5 text-neutral-300 transition-all duration-300 hover:bg-white/10 border border-white/10 hover:shadow-[0_0_15px_-3px_rgba(255,255,255,0.1)]"
                >
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                    </div>
                    <div className="absolute w-10 h-10 rounded-full blur-lg bg-white/10 transition-all duration-500 group-hover:bg-white/20 group-hover:w-48 group-hover:-translate-x-6 group-hover:scale-y-125" />
                    <span className="relative z-10 transition-all duration-300 group-hover:text-white group-hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">
                        Learn More  
                    </span>
                </Link>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto w-full">
                {features.map((feature, index) => (
                    <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="group relative p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-violet-500/30 transition-all duration-300"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 via-pink-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                        <div className="relative">
                            <div className="mb-4 p-2 rounded-lg bg-white/10 w-fit group-hover:bg-white/20 transition-colors duration-300">
                                {feature.icon}
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-violet-200 transition-colors duration-300">
                                {feature.title}
                            </h3>
                            <p className="text-neutral-400 text-sm group-hover:text-neutral-300 transition-colors duration-300">
                                {feature.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    </AuraBackground>
  )
}
