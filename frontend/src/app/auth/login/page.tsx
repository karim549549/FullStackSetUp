"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import  Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/services/stores/authStore";
import { LoginUser } from "@/services/apis/user.apis";
import { UserIcon, Mail, Lock, MailOpen , LockOpen, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import Google  from '@/assets/Google.png'
import Help from '@/assets/Help.png'
import {motion} from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger  } from "@radix-ui/react-tooltip";
import { LoginValidationSchema , LoginFormType } from "@/services/validations/loginValidationSchema";
import { LOCAL_STORAGE_KEYS } from '@/lib/constants/localStorageKeys';
import { StoredUser } from "@/lib/types/user.type";

export default function LoginPage() {
   const [apiError, setApiError] = useState<string | null>(null);
  const router = useRouter();
  const { login } = useAuthStore();
  const [visiability , setVisiability] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormType>({
    resolver: zodResolver(LoginValidationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: LoginFormType) => {
    const res = await LoginUser(data);
    if (res.success && res.data) {
      await login(res.data);

      // Check for guest diet plan data
      const guestDietPlan = localStorage.getItem(LOCAL_STORAGE_KEYS.GUEST_DIET_PLAN);
      const expiryDate = localStorage.getItem(LOCAL_STORAGE_KEYS.GUEST_DIET_PLAN_EXPIRY);

      if (guestDietPlan && expiryDate) {
        const expiry = new Date(expiryDate);
        if (expiry > new Date()) {
          // Valid guest diet plan, redirect to diet plan creation
          router.push('/dietplan/create');
          return;
        } else {
          // Clear expired data
          localStorage.removeItem(LOCAL_STORAGE_KEYS.GUEST_DIET_PLAN);
          localStorage.removeItem(LOCAL_STORAGE_KEYS.GUEST_DIET_PLAN_EXPIRY);
        }
      }

      // No valid guest diet plan, redirect to dashboard
      router.push('/user/dashboard');
    } else {
      setApiError(res.error);
    }
  };

  return (
    <>
    <section className="p-6  items-center flex justify-center w-full rounded-md  ">
      <motion.div
       initial={{ opacity: 0 , y: 40}}
       animate={{ opacity: 1  , y: 0 }}
       transition={{ duration: 0.5 , ease: "easeOut" }}
       exit={{ opacity: 0 , y: -20 }}
       className="p-5 bg-white  dark:bg-zinc-900  overflow-hidden     shadow-lg md:p-10 border-1  dark:border-neutral-700  relative  backdrop-blur-md w-full max-w-md rounded-lg  ">
        <div className="absolute   -top-3 -left-10 w-32 h-32 bg-violet-600/45 rounded-full blur-2xl animate-pulse -z-1" />
        <form onSubmit={handleSubmit(onSubmit)} className="z-10 mb-7 items-center flex flex-col space-y-2 w-full">
          
          {/* API Error Message */}
          {apiError && <p className="text-red-500 text-sm ">{apiError}</p>}

          {/* User Icon */}
          <div className='p-5 items-center border-sky-300 text-sky-300 dark:text-sky-400 dark:border-sky-400 w-fit flex justify-center rounded-full border-1   mb-6'>
            <UserIcon className='h-20 w-20' />
          </div>
          <div className="mb-5 w-full text-center items-center flex flex-col justify-center gap-2">
            <h3 className="text-2xl font-extrabold ">Welcome Back</h3>
            <p className="text-neutral-500 text-md max-w-[40ch]">
              What are you waiting for , Sign in now  to keep up with your progress
            </p>
          </div>
          {/* Email Input */}
          <div className="w-full dark:focus-within:text-neutral-300  dark:text-neutral-500 flex gap-2 items-center border-1  px-2 transition-all duration-200  focus-within:border-sky-400 rounded-md ">
            { 
              errors.email ? (
                <Mail className="w-5 h-5 " />
              ) : (
                <MailOpen className="w-5 h-5 text-sky-500" />
              )
            }
            <input
              type="email"
              id="email"
              required
              placeholder="example@example.com"
              {...register("email")}
              className="w-full focus:outline-0 px-3 py-2 border-none  focus:ring-0"
            />
          </div>
          <div className="min-h-5 w-full ml-2">
            {errors.email && <p className="text-red-500 text-sm ">{errors.email.message}</p>}
          </div>

          {/* Password Input */}
          <div className="w-full flex flex-col gap-1">
            <div className="text-end tracking-wider text-sm text-neutral-400 hover:underline transiton-all duration-200 hover:text-neutral-300 ">
              <Link href='/forgetpassword' >
              forgetpassword
              </Link>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-full py-2 dark:focus-within:text-neutral-300  dark:text-neutral-500 flex gap-2 items-center border-1  px-2 transition-all duration-200 focus-within:border-sky-400  rounded-md ">
                {
                  errors.password ? (
                    <Lock className="w-5 h-5 " />
                  ) : (
                    <LockOpen className="w-5 h-5 text-sky-500" />
                  )
                }
                <input
                  type={visiability ? "text" : "password"}
                  id="password"
                  autoComplete="current-password"
                  required
                  placeholder="password"
                  {...register("password")}
                  className="w-full text-md  focus:outline-0"
                />
                {
                  visiability ? (
                    <Eye className=" cursor-pointer" type="button" onClick={() => setVisiability(false)} />
                  ):(
                    <EyeOff className="cursor-pointer" type="button" onClick={() => setVisiability(true)} />
                  )
                }
              </div>
              <TooltipProvider >
                <Tooltip  >
                  <TooltipTrigger  >
                    <Image
                      src={Help}
                      alt ='help'
                      className="cursor-pointer border-1 p-1  rounded-full"
                      />
                  </TooltipTrigger>
                  <TooltipContent className="w-80 -left-80 top-10 absolute  capitalize text-neutral-400 text-xs backdrop-blur-lg border-1 p-2 rounded-md">
                    <p >
                      at least each from the following  :
                      1 uppercase  , 1 lower  , 1  number  and 1  special charachter 
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <div className="min-h-10 flex w-full ml-2">
            {errors.password && <p className="text-red-500 text-sm ">{errors.password.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full cursor-pointer duration-200  bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-sm transition-all mt-4"
          >
            {isSubmitting ? "Signing  in..." : "Sign in"}
          </button>


        </form>
        <div className="flex mt-2 mb-2 w-full justify-center text-center items-center gap-2">
          <hr className=" w-[50%] border-b-1 border-blue-500 " />
          <span>or</span>
          <hr className=" border-1  w-[50%] border-blue-600" />
        </div>
            {/* Google Sign-In Button */}
        <div className="w-full mt-4 mb-5">
          <button
            type="button"
            className="w-full  bg-transparent transition-all duration-200 py-2 rounded-md  border-1  border-blue-600 cursor-pointer hover:bg-blue-600  text-sm flex items-center justify-center gap-2"
          >
            <Image
            src={Google}
            alt='sign in with google'
            
            />
            Sign in with Google
          </button>
        </div>
      </motion.div>
    </section>
    </>
  );
}
