import Image from 'next/image'
import React from 'react'

export const Navbar = () => {
  return (
    <header className="w-full bg-blue-700 px-4 py-2 flex align-items-center justify-content-between">
        <Image src="/images/iso-logo.png" alt="Logo" width={40} height={40} />

        <i className="pi pi-cog" style={{ fontSize: '2rem', color: 'white' }}></i>

    </header>
  )
}
