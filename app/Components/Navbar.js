'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaGithub } from 'react-icons/fa'

const Navbar = () => {
  const [activePath, setActivePath] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    setActivePath(pathname);
  }, [pathname]);

  return (
    <nav className='flex justify-between items-center p-4 mx-auto bg-[rgb(29,80,58)] backdrop-blur-sm text-white'>
      <div>
        <Link href="/" className='text-lg font-bold'>BitLinks</Link>
      </div>
      <div className='flex  items-center font-medium'>
        {[
          { path: '/', name: 'Home' },
          { path: '/About', name: 'About' },
          { path: '/contact', name: 'Contact' },
          { path: '/Shorten', name: 'Shorten' }
        ].map(({ path, name }) => (
          <Link
            key={path}
            href={path}
            className={`
              px-3 py-1 rounded-md transition-all duration-150
              ${activePath === path ? 'font-semibold' : 'hover:text-gray-300'}
            `}
          >
            {name}
          </Link>
        ))}
        <a
          href="https://github.com/Aniket-a14"
          target="_blank"
          rel="noopener noreferrer"
          className='bg-white text-[rgb(29,80,58)] px-4 py-1 rounded-md ml-4 flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-150'
        >
          <FaGithub /> GitHub
        </a>
      </div>
    </nav>
  )
}

export default Navbar
