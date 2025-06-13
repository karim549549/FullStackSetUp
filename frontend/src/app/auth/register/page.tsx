"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegisterValidationSchema,
  RegisterFormType,
} from "@/services/validations/registerValidationSchema";
import  {useRouter} from 'next/navigation';
import { UserPlus, Lock, LockOpen, Eye, EyeOff, Loader2 , Mail , MailOpen } from "lucide-react";
import { RegisterUser } from "@/services/apis/user.apis";

export default function RegisterPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [apiError , setApiError] = useState<string | null>(null);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormType>({
    resolver: zodResolver(RegisterValidationSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: RegisterFormType) => {
    console.log("Register submitted:", data);
    // TODO: Send data to your backend API
    
    const res  =  await RegisterUser(data);
    console.log(res);
    if(res.success )
      router.push('/auth/verify-email')
    else
      setApiError(res.error);
  
  };

  return (
    <section className="flex p-2 items-center justify-center min-h-[80vh]">
      <div className="w-full  max-w-3xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg p-6 shadow-md relative overflow-hidden font-[var(--font-poppins)]">
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-violet-400/20 rounded-full blur-2xl animate-pulse z-0" />
        <div className="relative z-10 space-y-6">
          <div className="flex flex-col items-center gap-1 text-center">
            <UserPlus className="w-7 h-7 text-violet-500" />
            <h1 className="text-2xl font-semibold text-neutral-800 dark:text-white">
              Finish signing up
            </h1>
          </div>
          <div className="min-h-5 w-full ml-2">
            {apiError && (
              <p className="block sm:inline">{apiError}</p>
            )}
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
            noValidate
          >
            {/* First & Last Name */}
            <div className="flex  md:flex-row flex-col md:gap-2 gap-4">
              <input
                type="text"
                {...register("firstname")}
                placeholder="First name"
                className="flex-1 px-4 py-2 rounded-md bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 text-sm text-neutral-800 dark:text-white outline-none"
                disabled={isSubmitting}
              />
              <input
                type="text"
                {...register("lastname")}
                placeholder="Last name"
                className="flex-1 px-4 py-2 rounded-md bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 text-sm text-neutral-800 dark:text-white outline-none"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <div className="w-full dark:focus-within:text-neutral-300  dark:text-neutral-500 flex gap-2 items-center border-1  px-2 transition-all duration-200  focus-within:border-sky-400 rounded-md ">
                {errors.email ? (
                  <Mail className="w-5 h-5 " />
                ) : (
                  <MailOpen className="w-5 h-5 text-sky-500" />
                )}
                <input
                  type="email"
                  id="email"
                  required
                  placeholder="example@example.com"
                  {...register("email")}
                  className="w-full focus:outline-0 px-3 py-2 border-none  focus:ring-0"
                />
              </div>
              <div className="min-h-4 w-full ml-2">
                {errors.email && (
                  <p className="text-red-500 text-xs ">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>
            {/* Password */}
            <div>
              <div className="flex items-center gap-1">
                <div className="w-full py-2 dark:text-neutral-500 flex gap-2 items-center border px-2 transition-all duration-200 focus-within:border-sky-400 rounded-md bg-neutral-100 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-600">
                  {errors.password ? (
                    <Lock className="w-5 h-5 text-red-500" />
                  ) : (
                    <LockOpen className="w-5 h-5 text-sky-500" />
                  )}
                  <input
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Password"
                    {...register("password")}
                    className="w-full bg-transparent focus:outline-none text-neutral-800 dark:text-white text-sm"
                    disabled={isSubmitting}
                  />
                  {passwordVisible ? (
                    <Eye
                      className="cursor-pointer text-neutral-600 dark:text-neutral-300"
                      onClick={() => setPasswordVisible(false)}
                    />
                  ) : (
                    <EyeOff
                      className="cursor-pointer text-neutral-600 dark:text-neutral-300"
                      onClick={() => setPasswordVisible(true)}
                    />
                  )}
                </div>
              </div>
              <div className="min-h-4 w-full ml-2">
                {errors.password && (
                  <p className="text-red-500 text-xs">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <div className="flex items-center gap-1">
                <div className="w-full py-2 dark:text-neutral-500 flex gap-2 items-center border px-2 transition-all duration-200 focus-within:border-sky-400 rounded-md bg-neutral-100 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-600">
                  {errors.confirmPassword ? (
                    <Lock className="w-5 h-5 text-red-500" />
                  ) : (
                    <LockOpen className="w-5 h-5 text-sky-500" />
                  )}
                  <input
                    type={confirmPasswordVisible ? "text" : "password"}
                    placeholder="Confirm Password"
                    {...register("confirmPassword")}
                    className="w-full bg-transparent focus:outline-none text-neutral-800 dark:text-white text-sm"
                    disabled={isSubmitting}
                  />
                  {confirmPasswordVisible ? (
                    <Eye
                      className="cursor-pointer text-neutral-600 dark:text-neutral-300"
                      onClick={() => setConfirmPasswordVisible(false)}
                    />
                  ) : (
                    <EyeOff
                      className="cursor-pointer text-neutral-600 dark:text-neutral-300"
                      onClick={() => setConfirmPasswordVisible(true)}
                    />
                  )}
                </div>
              </div>
              <div className="min-h-4 w-full ml-2">
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full cursor-pointer bg-sky-600 hover:bg-sky-700 disabled:bg-neutral-500 disabled:cursor-not-allowed text-white py-2 px-4 rounded-md transition text-sm flex justify-center items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  Create Account
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
