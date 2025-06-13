
import React from 'react'
import Logo from './Logo'
import ThemeSwitch from './ThemeSwitch'
import UserAvatar from './UserAvatar'
import SearchDialog from './SearchDialog'
export default function MainNavbar() {
  return (
    <>
        <div className={`w-full transition-all duration-200 bg-gradient-to-r from-pink-500 to-violet-500 h-3  blur-sm`}></div>
        <div className={`flex p-2 transition-all duration-200  justify-center items-center px-2 backdrop-blur-lg dark:bg-zinc-800/20 bg-neutral-200 shadow-lg  `}>
            <nav className='flex  justify-between items-center px-2 max-auto container max-w-8xl w-full'>
                <div className='flex items-center '>
                    <Logo />
                </div>
                <ul className='flex items-center gap-3'>
                    <li>
                        <SearchDialog />
                    </li>
                    <li className='cursor-pointer'>
                        <ThemeSwitch    />
                    </li>
                    <li className='cursor-pointer'>
                        <UserAvatar />
                    </li>
                </ul>
            </nav>
        </div>
    </>
  )
}
