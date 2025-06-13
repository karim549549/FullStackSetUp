import React from 'react'
import Link from 'next/link'
import Logo from '@/components/custom/Logo'
import { ChevronRight } from 'lucide-react'
export default function Footer() {
  return (
    <footer className="bg-white pb-20  dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800">
      <div className="flex flex-col gap-2 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className='flex items-center justify-between px-5'>
            <div className='flex flex-col gap-3'>
                <div className='mb-5'>
                    <Logo  />
                </div>
                <p className='ml-3 dark:text-neutral-400'>Nutrition tracking for real life.</p>
                <button className='ml-2 px-4 py-2 rounded-full bg-pink-500 flex items-center gap-2 justify-center text-white' >Start today <ChevronRight className='w-4 h-4'/></button>
            </div>
            <div className='flex   justify-between gap-4 w-[35%]'> 
                <div className='flex flex-col  gap-5'>
                    <h6 className='font-bold capitalize'>Products</h6>
                    <ul className='space-y-3 text-sm capitalize ml-1 text-neutral-800 dark:text-neutral-400'>
                        <li><Link href='/terms'>Recipes</Link></li>
                        <li><Link href='/privacy'>Diet Plans</Link></li>
                        <li><Link href='/cookies'>Workouts <span className='text-xs bg-violet-500 text-center text-white px-2 py-0.5 rounded-full'>New soon</span></Link></li>
                    </ul>
                </div>
                <div className='flex flex-col  gap-5'>
                    <h6 className='font-bold capitalize'>Resources</h6>
                    <ul className='space-y-3 text-sm capitalize ml-1 text-neutral-800 dark:text-neutral-400'>
                        <li><Link href='/terms'>Blogs</Link></li>
                        <li><Link href='/terms'>Community</Link></li>
                        <li><Link href='/privacy'>Contact Us</Link></li>
                        <li><Link href='/cookies'>Support center</Link></li>
                    </ul>
                </div>
                <div className='flex flex-col  gap-5'>
                <h6 className='font-bold capitalize'>Company</h6>
                <ul className='space-y-3 text-sm capitalize ml-1 text-neutral-800 dark:text-neutral-400'>
                        <li><Link href='/terms'>Careers</Link></li>
                        <li><Link href='/privacy'>About Us</Link></li>
                        <li><Link href='/cookies'>progress</Link></li>
                        <li><Link href='/cookies'>Advertise with use</Link></li>
                    </ul>
                </div>
            </div>
        </div>
        <hr className='border-b-[1px] border-gray-200 dark:border-stone-800 my-5' />
        <p className='text-sm text-center text-neutral-500 dark:text-neutral-400'>Copyright &copy; 2025 All rights reserved community guidelines  feedback terms privacy cookie preferences</p>

        {/*social media links and more */}
        <div className='flex'>
        </div>
      </div>
    </footer>
  )
}