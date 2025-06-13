"use client";

import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Loader2, Mail } from "lucide-react";
import {
  VerificationCodeFormType,
  VerificationCodeValidationSchema,
} from "@/services/validations/VerificationCodeValdiationSchema";
import { useRouter  } from 'next/navigation';
import { SubmitOTPVerficationCode } from "@/services/apis/user.apis";
export default function VerifyEmailPage() {
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
    const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<VerificationCodeFormType>({
    resolver: zodResolver(VerificationCodeValidationSchema),
    mode: "onBlur",
  });

  const handleOtpChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Update hidden field with joined OTP
    setValue("verificationCode", newOtp.join(""));

    // Focus next input
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpBackspace = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const onSubmit = async (data: VerificationCodeFormType) => {
    setIsLoading(true);
    try {
      const res = await SubmitOTPVerficationCode(data.verificationCode);
      if (res.success) {
        router.push("/");
      } else {
        setApiError(res.error);
      }
    } catch {
      setApiError("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-[87vh] flex items-center justify-center w-full p-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="p-5 bg-white dark:bg-zinc-900 overflow-hidden shadow-lg md:p-10 border dark:border-neutral-700 relative backdrop-blur-md w-full max-w-md rounded-lg"
      >
        <div className="absolute -top-3 -left-10 w-32 h-32 bg-violet-600/45 rounded-full blur-2xl animate-pulse -z-10" />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center space-y-2"
        >
          {apiError && <p className="text-red-500 text-sm">{apiError}</p>}

          <div className="text-center">
            <div className="flex items-center gap-2">
                <Mail className="w-6 h-6 text-sky-500" /> 
                <h3 className="text-2xl text-center font-extrabold">
                Email Verification
                </h3>
            </div>
            <p className="text-neutral-500 text-sm max-w-[40ch] mt-2">
              check your email for 6-digits OTP Code to verify your email
              address.
              <br />
              if not found check your spam folder
            </p>
          </div>

          {/* OTP Input Boxes */}
          <div className="w-full flex  items-center justify-center  rounded-md transition-all duration-200 dark:text-neutral-400 focus-within:border-sky-400">
            <div className="flex items-center justify-center gap-3 mt-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  className="w-10 h-12 text-center text-xl bg-transparent border-b-2 border-neutral-400 focus:border-blue-600 focus:outline-none dark:border-neutral-600 dark:focus:border-blue-400 transition-all"
                  onChange={(e) => handleOtpChange(e, index)}
                  onKeyDown={(e) => handleOtpBackspace(e, index)}
                  ref={(el) => {
                    otpRefs.current[index] = el;
                  }}
                />
              ))}
            </div>
          </div>

          {/* Hidden Input for React Hook Form */}
          <input type="hidden" {...register("verificationCode")} />

          {/* Error Display */}
          <div className="min-h-5 w-full text-left ml-1">
            {errors.verificationCode && (
              <p className="text-red-500 text-sm">
                {errors.verificationCode.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || isLoading}
            className="w-full cursor-pointer bg-sky-600 font-bold hover:bg-blue-700 transition-all text-white py-2 rounded-md text-sm mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting || isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="animate-spin h-4 w-4" />
                Verifying...
              </span>
            ) : (
              "Verify"
            )}
          </button>
        </form>
        <p className="text-center dark:text-neutral-600 mt-4 text-sm   ">
          Didn&apos;t get the code?{" "}
          <span className="text-blue-600 cursor-pointer">Resend</span>
        </p>
      </motion.div>
    </section>
  );
}
