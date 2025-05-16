"use client"

import { usePathname } from 'next/navigation'
import React from 'react'
import Link from "next/link" 
import { Button } from '@/components/ui/button'

function Navbar() {

    const pathname = usePathname()

  return (
    <nav className='bg-secondary flex justify-between items-center p-4 rounded-xl w-[600px] shadow-sm' >
      <div className='flex gap-x-2'>
        <Button asChild >
            <Link href={"/settings"}>Settings</Link>
        </Button>
      </div>

      <p>User Botton</p>
    </nav>
  )
}

export default Navbar
