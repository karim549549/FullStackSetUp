import React  from 'react'
import Logo from './Logo'
import ThemeSwitch from './ThemeSwitch'
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DoorOpen, DoorOpenIcon, Menu } from 'lucide-react'

export default function AuthNavBar() {

  return (
    <>
        <div className={`w-full transition-all duration-200 bg-gradient-to-r from-pink-500 to-violet-500 h-3  blur-sm`}></div>
        <div className={`flex p-2 transition-all duration-200  justify-center items-center px-2 backdrop-blur-lg dark:bg-zinc-800/20 bg-neutral-200 shadow-lg  `}>
            <nav className='flex  justify-between items-center px-2 max-auto container max-w-8xl w-full'>
            <div className='flex items-center '>
                <Logo />
            </div>

                <ul className=' items-center gap-3 md:flex  hidden'>
                        <li>
                            <Link
                                href="/auth/register"
                                className="bg-sky-500 hover:bg-sky-600 text-white dark:bg-sky-500/20 dark:hover:bg-sky-500/40 border border-neutral-300 dark:border-neutral-600 px-3 py-1.5 rounded-md text-sm capitalize transition-all duration-200"
                            >
                                Register
                            </Link>
                        </li>
                        <span> or </span>
                        <li>
                            <Link
                                href="/auth/login"
                                className="bg-transparent hover:bg-gray-100 text-black dark:text-white dark:hover:bg-violet-500/40 border border-neutral-300 dark:border-neutral-600 px-3 py-1.5 rounded-md text-sm capitalize transition-all duration-200"
                            >
                                Sign In
                            </Link>
                        </li>
                    <li>
                        <ThemeSwitch/>
                    </li>
                </ul>
                <DropdownMenu >
                    <DropdownMenuTrigger className='flex md:hidden  '>
                        <Menu className=' text-neutral-500 cursor-pointer w-6 h-6' />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='mr-3' >
                        <DropdownMenuItem className='flex items-center  gap-2  '>
                            <ThemeSwitch/>
                            <span className='text-sm font-bold'>Theme</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem className='flex items-center  gap-2  '>
                            <Link href='/auth/login' className='flex items-center gap-2 '> 
                                <div className='p-3 border-1 rounded-md dark:bg-black bg-white'>
                                  <DoorOpen className='w-6 h-6'/>
                                </div>
                                <span className='text-sm font-bold'>Sign in</span>
                            </Link>
                        </DropdownMenuItem>
                                          <DropdownMenuItem className='flex items-center  gap-2  '>
                            <Link href='/auth/register' className='flex items-center gap-2 '> 
                                <div className='p-3 border-1 rounded-md dark:bg-black bg-white'>
                                  <DoorOpenIcon className='w-6 h-6'/>
                                </div>
                                <span className='text-sm font-bold'>Reigster </span>
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </nav>
        </div>
    </>
  )
}
