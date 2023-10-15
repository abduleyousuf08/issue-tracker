import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/prisma/client';
import { NextAuthOptions } from 'next-auth';
import { custom } from 'openid-client';

const authOptions: NextAuthOptions = {
   adapter: PrismaAdapter(prisma),
   providers: [
      GoogleProvider({
         clientId: process.env.GOOGLE_CLIENT_ID!,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
   ],
   session: {
      strategy: 'jwt',
   },
};

custom.setHttpOptionsDefaults({
   timeout: 18000,
});

export default authOptions;
