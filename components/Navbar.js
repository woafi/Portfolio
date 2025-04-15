import React from 'react'
import Link from 'next/link'
import Navlink from "@/components/Navblink"
import MobileNav from './MobileNav'

function Navbar() {
  return (
    <header>
    <div className='container mx-auto flex items-center justify-between px-5 md:px-0 py-5'>
        {/* Logo */}
        <Link href="/">
        <div className="text-4xl font-semibold"><span className='accent'>W</span><span>oafi</span><span>.</span></div>
        </Link>
        <div className='md:block hidden'>
            <Navlink />
        </div>
        {/* mobile nav */}
        <div className="md:hidden">
          <MobileNav/>
        </div>
    </div>
    </header>
  )
}

export default Navbar
