"use client";
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Flag } from 'lucide-react'
import Link from 'next/link'
import Step1 from '../../assets/Step1.webp'
import Step2 from '../../assets/step2.webp'
import Step3 from '../../assets/step3.webp'
import { TracingBeam } from '@/components/custom/TracingBeam';

export default function StepsSection() {
  return (
    <section className='dark:bg-black mt-10 p-5 relative'>
        <div className='absolute top-0  right-20 w-1 h-[50%] bg-gradient-to-r from-pink-500/50 to-violet-500/50 rounded-full blur-xs animate-ping -z-0' />
        <TracingBeam className='p-2 relative ' >
            <div className="absolute top-15 -right-15 w-64 h-64 bg-sky-500/20 rounded-full blur-2xl animate-pulse z-0" />
            <div className="absolute top-115 left-15 w-64 h-64 bg-pink-500/20 rounded-full blur-2xl animate-pulse z-0" />
            <div className="absolute bottom-15 -right-15 w-64 h-64 bg-violet-500/20 rounded-full blur-2xl animate-pulse z-0" />
            <div className="md:p-10 p-5   relative ">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex  flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0 , y: 40 }}
                        whileInView={{ opacity: 1 , y: 0 }}
                        transition={{ duration: 0.5}}    
                    >
                        <Flag className="w-8 h-8 text-blue-600 mb-2" />
                    </motion.div>
                    <motion.div
                    initial={{ opacity: 0 , y: 40 }}
                    whileInView={{ opacity: 1 , y: 0 }}
                    transition={{ duration: 1}}
                    
                    >
                        <h2 className=" text-2xl md:text-4xl mb-5 max-w-[40ch] tracking-wide md:leading-13  font-bold text-center ">
                        Hit your fitness goal with our easy-to-follow meal plans in 
                        <span className='text-blue-500 font-extrabold '> 1-2-3</span>
                        </h2>
                    </motion.div>
                    <div className='flex flex-col gap-10'>
                    {/* step1  */}
                        <motion.div
                        initial={{ opacity: 0 , y: 40 , rotate: -5 }}
                        whileInView={{ opacity: 1 , y: 0 , rotate: 0 }}
                        transition={{ duration: 1}}
                        className='flex md:flex-row flex-col md:translate-x-20 md:translate-y-15 gap-5 md:gap-10 items-center'>
                            <Link href="dietplan/create" className='max-w-[50%] cursor-pointer transition-all duration-200 hover:scale-108 hover:-rotate-0 -rotate-5'>
                            <Image  
                            src={Step1}
                            alt='step1'
                            className='object-cover max-w-[100%]'
                            />
                            </Link>
                            <div className='flex gap-5 p-5  flex-col min-w-[50%] '>
                                <span className='md:text-6xl text-3xl font-black ml-2  text-blue-500 '>1</span>
                                <div className='flex  flex-col gap-3 max-w-80 text-start'>
                                    <h2 className='text-4xl font-semibold '>Track calories, macros & more</h2>
                                    <p className='text-neutral-400'>Log even faster with tools like barcode scan & the NEW voice log.</p>
                                </div>
                            </div>
                        </motion.div>
                        {/* step2  */}
                        
                        <motion.div
                        initial={{ opacity: 0 , y: 40 , rotate: -5 }}
                        whileInView={{ opacity: 1 , y: 0 , rotate: 0 }}
                        transition={{ duration: 1}}

                        className='flex   md:flex-row-reverse  flex-col     gap-5 items-center'>
                            <Link href="dietplan/create" className='max-w-[50%] rotate-5 cursor-pointer transition-all duration-200 hover:scale-108 hover:rotate-0'>
                                <Image  
                                src={Step2}
                                alt='step2'
                                className='object-cover max-w-[100%]'
                                />
                            </Link>
                            <div className='flex  gap-5 p-5  flex-col min-w-[50%] '>
                            <span className='md:text-6xl text-3xl font-black ml-2  text-pink-500 '>2</span>
                            <div className='flex  flex-col gap-3 max-w-80 text-start'>
                                <h2 className='text-4xl font-semibold '>Follow your progress</h2>
                                <p className='text-neutral-400'>Forget perfection. This is about building long-term habits—and enjoying the journey.</p>
                            </div>
                            </div>
                        </motion.div>

                        {/* step3  */}
                        
                        <motion.div
                        initial={{ opacity: 0 , y: 40  , rotate: -5 }}
                        whileInView={{ opacity: 1 , y: 0 , rotate: 0 }}
                        transition={{ duration: 1}}
                        className='flex md:translate-x-20 md:flex-row  flex-col md:-translate-y-15  gap-5 md:gap-10 items-center'>
                            <Link href="recipe/filter" className='max-w-[50%] -rotate-5 cursor-pointer transition-all duration-200 hover:scale-108 hover:rotate-0'>
                                <Image  
                                src={Step3}
                                alt='step3'
                                className='max-w-[100%]'
                                />
                            </Link>
                            <div className='flex gap-5 p-5  flex-col min-w-[50%] '>
                            <span className='md:text-6xl text-3xl font-black ml-2  text-violet-500 '>3</span>
                            <div className='flex  flex-col gap-3 max-w-80 text-start'>
                                <h2 className='text-4xl font-semibold '>Eat better and hit your goals</h2>
                                <p className='text-neutral-400'>Learn which foods help you feel your best, and get tailored weekly meal plans!</p>
                            </div>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </div>
        </TracingBeam>
    </section>
  )
}
