import React from 'react'
import Link from 'next/link'
export default function Logo() {
  return (
    <div className='transition-all duration-200'>
      <Link href='/' className='cursor-pointer text-transparent from-pink-700   bg-gradient-to-r    to-slate-800 bg-clip-text p-3'>
        <em className='text-2xl font-black'>
          FITAI
        </em>
      </Link>
    </div>
  )
}
