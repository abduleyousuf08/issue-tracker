'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiFillBug } from 'react-icons/ai';
import classNames from 'classnames';

function NavBar() {
   const currentPath = usePathname();

   const links = [
      { label: 'Dashboard', href: '/' },
      { label: 'Issues', href: '/issues' },
   ];

   return (
      <nav className='flex border-b mb-5 space-x-6 px-5 h-14 items-center'>
         <Link href='/'>
            <AiFillBug />
         </Link>
         <ul className='flex space-x-6'>
            {links.map((link) => (
               <Link
                  href={link.href}
                  key={link.href}
                  className={classNames({
                     'text-zinc-900': link.href === currentPath,
                     'text-zinc-500': link.href !== currentPath,
                     'hover:text-zinc-600': true,
                  })}
               >
                  {link.label}
               </Link>
            ))}
         </ul>
      </nav>
   );
}

export default NavBar;
