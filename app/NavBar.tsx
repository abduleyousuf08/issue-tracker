'use client';

import { Box, Container, Flex } from '@radix-ui/themes';
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
      <nav className=' border-b mb-2  p-4 h-14 '>
         <Container>
            <Flex justify='between'>
               <Flex align='center' gap='3'>
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
               </Flex>
               <Box>
                  {status === 'authenticated' && (
                     <Link href='/api/auth/signout'>Log out</Link>
                  )}
                  {status === 'unauthenticated' && (
                     <Link href='/api/auth/signin'>Login</Link>
                  )}
               </Box>
            </Flex>
         </Container>
      </nav>
   );
}

export default NavBar;
