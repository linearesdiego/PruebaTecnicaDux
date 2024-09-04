import Image from 'next/image'
import React from 'react'

export const Sidebar = () => {
  return (
    <div className="w-6rem hidden bg-blue-200 h-screen lg:flex flex-column align-items-center gap-2 p-2">
        <Image src="/images/box.png" alt="Logo" width={30} height={30} />
        <Image src="/images/box.png" alt="Logo" width={30} height={30} />
        <Image src="/images/box.png" alt="Logo" width={30} height={30} />
        <Image src="/images/box.png" alt="Logo" width={30} height={30} />
        <Image src="/images/box.png" alt="Logo" width={30} height={30} />
        <Image src="/images/box.png" alt="Logo" width={30} height={30} />
        <Image src="/images/box.png" alt="Logo" width={30} height={30} />
    </div>
  )
}
