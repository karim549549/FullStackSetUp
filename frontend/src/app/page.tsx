"use client";
import HeroSection from '../components/Home/HeroSection'  
import StepsSection from '@/components/Home/StepsSection';
import Image from 'next/image';
import {motion} from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Star from '../assets/star.png'
import start from '../assets/start.webp'
import  {Carousel , CarouselContent , CarouselItem } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";
import type { CarouselApi } from '@/components/ui/carousel';
import {  useState , useEffect } from 'react';
import Footer from '@/components/Home/Footer'
import RecipeCarousel from '@/components/Home/RecipeCarousel'
import MainNavbar from '@/components/custom/MainNavbar';
import { Navbar } from '@/components/custom/Navbar';

const testimonials = [
  {
    id: 1,
    name: "Iain M.",
    rating: 5,
    comment: "Good for tracking calories and macros with a huge database of food.",
  },
  {
    id: 2,
    name: "Sarah K.",
    rating: 5,
    comment: "The app completely changed how I approach nutrition. So easy to use!",
  },
  {
    id: 3,
    name: "Michael T.",
    rating: 5,
    comment: "Best fitness tracking app I've used. The community features are amazing.",
  },
  {
    id: 4,
    name: "Jessica L.",
    rating: 5,
    comment: "Love the recipe suggestions based on my macros. Super helpful!",
  },
  {
    id: 5,
    name: "David P.",
    rating: 5,
    comment: "The progress tracking keeps me motivated. 10/10 would recommend.",
  },
]

export default function HomePage() {
  const [api, setApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrentIndex(api.selectedScrollSnap());
    });
  }, [api]);
  return (
    <main className="min-h-screen">
      <header className="sticky   top-0 z-10 bg-transparent backdrop-blur-lg ">
        <MainNavbar/>
      </header>
      <div className=" dark:bg-black">
        {/* Hero Section */}
        <HeroSection />
        {/* Features Section */}
        <StepsSection />

        <motion.section 
        initial={{opacity:0  , y:40}}
        whileInView={{opacity:1 ,   y:0}}
        transition={{duration:1}}
        className='pt-10 bg-gradient-to-bl from-blue-800/15 to-violet-800/15 '>
          <div className="max-w-6xl items-center justify-between flex flex-col gap-5 md:flex-row mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{x:-100 , opacity:0}}
              whileInView={{x:0 , opacity:1}}
              transition={{duration: 1 }} 
              className=' max-w-md '>
              <p className='font-semibold mb-2 text-lg'>Get started</p>
              <h2 className='text-4xl  font-extrabold mb-2'>Starting is the hard part.</h2>
              <p className='text-4xl mb-5 dark:text-neutral-400 text-neutral-700  '>We make it easy...</p>
              <button
                  className="group cursor-pointer w-fit relative overflow-hidden px-8 flex items-center gap-2 rounded-lg bg-violet-100 text-violet-700 transition-all duration-300 hover:bg-transparent border  py-3 hover:shadow-[0_0_15px_-3px_rgba(124,58,237,0.2)] dark:bg-violet-500/20 dark:text-neutral-500  dark:hover:shadow-[0_0_15px_-3px_rgba(124,58,237,0.3)]"
                  >
                      <div className="absolute inset-0 overflow-hidden">
                          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-100 via-transparent to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-500 dark:from-slate-500/10 dark:opacity-0 dark:group-hover:opacity-100" />
                      </div>
                      <div className="absolute w-10 h-10 rounded-full blur-lg bg-violet-200 transition-all duration-500 group-hover:bg-violet-300 group-hover:w-48 group-hover:-translate-x-6 group-hover:scale-y-125 dark:bg-violet-500/20 dark:group-hover:bg-slate-500/60" />
                      <span className="relative z-10 transition-all duration-300 group-hover:text-violet-600 group-hover:drop-shadow-[0_0_5px_rgba(167,139,250,0.3)] dark:group-hover:text-violet-300/90 dark:group-hover:drop-shadow-[0_0_5px_rgba(124,58,237,0.5)]">
                          Get Started
                      </span>
                      <div className="relative z-10 transition-all duration-500 group-hover:translate-x-3 group-hover:scale-110">
                          <ChevronRight className="w-5 h-5 text-violet-500 transition-all duration-300 group-hover:text-violet-600 group-hover:scale-110 dark:text-violet-500 dark:group-hover:text-violet-300" />
                      </div>
                      <div className="absolute inset-0 rounded-lg border border-transparent group-hover:border-violet-300 transition-all duration-500 pointer-events-none dark:group-hover:border-violet-500/30" />
              </button>
            </motion.div>
            <motion.div
            initial={{x:100 , opacity:0}}
            whileInView={{x:0 , opacity:1}}
            transition={{duration: 1}} 
            className='max-w-[50%]'>
              <Image
                src={start}
                alt="mobile app"
                className='object-cover w-full h-full'
              />
            </motion.div>
          </div>
        </motion.section>
        {/* Testimonials */}
        <motion.section
        initial={{opacity:0  , y:40 , backgroundColor:'transparent'}}
        whileInView={{opacity:1 ,   y:0 , backgroundColor:''}}
        transition={{duration:1}}
        className="pt-15 mb-10 pb-10 dark:bg-zinc-900">
          <div className="max-w-7xl gap-3 mx-auto px-4 sm:px-6 lg:px-8 flex items-center flex-col justify-center">
            <div className='flex gap-2'>
              {[...Array(5)].map((_, i) => ( 
                <motion.div
                initial={{  opacity:0 , rotate:-360}}
                whileInView={{ opacity:1 , rotate:0}}
                transition={{duration: 1 , delay: i * 0.2}}  
                key={i}>
                  <Image  src={Star} alt="star" className='w-7 h-7' />
                </motion.div>
              ))}
            </div>
            <motion.h2 initial={{opacity:0  }} whileInView={{opacity:1 }} transition={{duration:1}} className="md:text-5xl text-3xl font-bold text-center mb-1">3.5 Million 5-Star Ratings</motion.h2>
            
            <Carousel
              setApi={setApi}
              plugins={[
                Autoplay({
                  delay: 5000,
                  stopOnInteraction: false, 
                }),
              ]}
              opts={{
                align: "center",
                loop: true,
              }}
              className="w-full max-w-xl"
            >
              <CarouselContent>
                {testimonials.map((user, index) => (
                  <CarouselItem key={index}>
                    <div className='flex items-center flex-col gap-3 p-4'>
                      <em className="text-center text-lg italic">&quot;{user.comment}&quot;</em>
                      <span className="font-medium">{user.name}</span>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            
            <div className="flex justify-center gap-2">
              {testimonials.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-violet-500' : 'bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.section>
        <RecipeCarousel />
        <Footer />
      </div>
    </main>
  )
}