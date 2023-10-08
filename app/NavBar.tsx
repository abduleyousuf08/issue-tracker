import Link from 'next/link';
import React from 'react';
import { AiFillBug } from 'react-icons/ai';

function NavBar() {
   const links = [
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Issue', href: '/issue' },
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
                  className='text-zinc-500 hover:text-zinc-800 transition-colors'
               >
                  {link.label}
               </Link>
            ))}
         </ul>
      </nav>
   );
}

export default NavBar;
