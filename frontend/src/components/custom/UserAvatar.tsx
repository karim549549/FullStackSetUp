'use client';

import React from 'react';
import { useAuthStore } from '@/services/stores/authStore';
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from '@/components/ui/hover-card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRouter } from 'next/navigation'; 
import { 
  Calendar, 
  ChartScatter, 
  Drumstick, 
  ForkKnife, 
  LogOut, 
  Settings, 
  User,
  Activity,
  Salad
} from 'lucide-react';

export default function UserAvatar() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    logout();
    router.push('/auth/login'); 
  }

  if (!user) return null;  

  return (
    <HoverCard openDelay={200} closeDelay={1000}>
      <HoverCardTrigger asChild>
        <span className='px-3 py-1 flex rounded-full items-center justify-center bg-gradient-to-r from-pink-500 to-violet-500 text-white font-semibold text-lg hover:from-pink-600 hover:to-violet-600 transition-all duration-300 cursor-pointer'>
          {user.name[0]?.toUpperCase()}
        </span>
      </HoverCardTrigger>

      <HoverCardContent className="w-72 -left-10 bg-white/5 backdrop-blur-xl border border-white/10 flex p-0 overflow-hidden relative flex-col rounded-xl shadow-lg">
        {/* User Info Section */}
        <div className="p-4 text-center border-b border-white/10">
          <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex items-center justify-center text-2xl font-bold text-white">
            {user.name[0]?.toUpperCase()}
          </div>
          <p className="font-semibold text-lg text-white">{user.name}</p>
          <p className="text-sm text-neutral-400">{user.email}</p>
        </div>

        {/* Main Navigation Section */}
        <div className="p-2">
          <ul className='flex flex-col gap-1'>
            <li 
              className='flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/5 transition-all duration-200 cursor-pointer group'
              onClick={() => router.push('/user/dashboard')}
            >
              <Calendar className='w-4 h-4 text-pink-500 group-hover:text-pink-400'/>
              <span className='text-sm text-neutral-200 group-hover:text-white'>Dashboard</span>
            </li>
            <li 
              className='flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/5 transition-all duration-200 cursor-pointer group'
              onClick={() => router.push('/user/analytics')}
            >
              <ChartScatter className='w-4 h-4 text-violet-500 group-hover:text-violet-400'/>
              <span className='text-sm text-neutral-200 group-hover:text-white'>Analytics</span>
            </li>
            <li 
              className='flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/5 transition-all duration-200 cursor-pointer group'
              onClick={() => router.push('/user/diet-recipe/diets')}
            >
              <Salad className='w-4 h-4 text-emerald-500 group-hover:text-emerald-400'/>
              <span className='text-sm text-neutral-200 group-hover:text-white'>Diet Plans</span>
            </li>
            <li 
              className='flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/5 transition-all duration-200 cursor-pointer group'
              onClick={() => router.push('/user/diet-recipe/recipes')}
            >
              <Drumstick className='w-4 h-4 text-amber-500 group-hover:text-amber-400'/>
              <span className='text-sm text-neutral-200 group-hover:text-white'>Recipes</span>
            </li>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <li className='flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/5 transition-all duration-200 cursor-not-allowed opacity-50'>
                    <Activity className='w-4 h-4 text-blue-500'/>
                    <span className='text-sm text-neutral-200'>Activity</span>
                  </li>
                </TooltipTrigger>
                <TooltipContent className="bg-sky-950/90 backdrop-blur-sm border-sky-800/50">
                  <p className="text-sky-200">Coming Soon</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </ul>
        </div>

        {/* Settings Section */}
        <div className="p-2 border-t border-white/10">
          <ul className='flex flex-col gap-1'>
            <li 
              className='flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/5 transition-all duration-200 cursor-pointer group'
              onClick={() => router.push('/user/profile')}
            >
              <User className='w-4 h-4 text-sky-500 group-hover:text-sky-400'/>
              <span className='text-sm text-neutral-200 group-hover:text-white'>Profile</span>
            </li>
            <li 
              className='flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/5 transition-all duration-200 cursor-pointer group'
              onClick={() => router.push('/user/settings/account')}
            >
              <Settings className='w-4 h-4 text-neutral-500 group-hover:text-neutral-400'/>
              <span className='text-sm text-neutral-200 group-hover:text-white'>Settings</span>
            </li>
            <li 
              className='flex items-center gap-3 p-2.5 rounded-lg hover:bg-red-500/10 transition-all duration-200 cursor-pointer group'
              onClick={handleLogout}
            >
              <LogOut className='w-4 h-4 text-red-500 group-hover:text-red-400'/>
              <span className='text-sm text-red-500 group-hover:text-red-400'>Logout</span>
            </li>
          </ul>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
