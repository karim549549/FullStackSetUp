import AuthNavBar from '@/components/custom/AuthNavBar';
import React from 'react'

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="sticky   top-0 z-10 bg-transparent backdrop-blur-lg ">
        <AuthNavBar/>
      </header>
      <section className='min-h-[87vh] dark:bg-transparent bg-[#f1e8fc]' >{children}</section>
      <hr className='border-b-[1px] border-gray-200 dark:border-stone-800 my-1' />
      <footer className='mb-2 p-2'>
        <p className='text-xs text-center text-neutral-500 dark:text-neutral-400'>Copyright &copy; 2025 All rights reserved community guidelines  feedback terms privacy cookie preferences</p>
      </footer>
    </>
  );
}
