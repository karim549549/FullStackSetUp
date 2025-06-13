"use client";
import React , { useState , useEffect} from 'react'
import Logo from './Logo'
import ThemeSwitch from './ThemeSwitch'
import SearchDialog from './SearchDialog'
import UserAvatar from './UserAvatar'
import { useAuthStore } from '@/services/stores/authStore'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  Drawer, 
  DrawerContent,
  DrawerTrigger,
  DrawerClose,
  DrawerFooter
} from '@/components/ui/drawer'
import { Menu, X, LayoutDashboard, Calendar, Settings, User, ChartArea, Notebook } from 'lucide-react';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">
              FitAI
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/products"
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground rounded-md"
            >
              Products
            </Link>

            <Link
              href="/explore"
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground rounded-md"
            >
              Explore
            </Link>

            <Link
              href="/community"
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground rounded-md"
            >
              Community
            </Link>
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <SearchDialog />
          </div>
          <nav className="flex items-center space-x-2">
            <ModeToggle />
            <UserAvatar />
          </nav>
        </div>
      </div>
    </header>
  )
}
