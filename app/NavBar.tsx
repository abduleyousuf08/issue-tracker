'use client';

import { Box } from '@radix-ui/themes';
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiFillBug } from 'react-icons/ai';

function NavBar() {
   const currentPath = usePathname();
   const { status, data: session } = useSession();

   const links = [
      { label: 'Dashboard', href: '/' },
      { label: 'Issues', href: '/issues/list' },
   ];

   return (
      <nav className='flex border-b mb-5 space-x-6 px-5 h-14 items-center'>
         <Link href='/'>
            <AiFillBug />
         </Link>
         <ul className='flex space-x-6'>
            {links.map((link) => (
               <li key={link.href}>
                  <Link
                     href={link.href}
                     className={classNames({
                        'text-zinc-900': link.href === currentPath,
                        'text-zinc-500': link.href !== currentPath,
                        'hover:text-zinc-600': true,
                     })}
                  >
                     {link.label}
                  </Link>
               </li>
            ))}
         </ul>
         <Box>
            {status === 'authenticated' && (
               <Link href='/api/auth/signout'>Log out</Link>
            )}
            {status === 'unauthenticated' && (
               <Link href='/api/auth/signin'>Login</Link>
            )}
         </Box>
      </nav>
   );
}

export default NavBar;
