import nextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import type { NextApiResponse, NextApiRequest } from 'next/types';
('next');

async function auth(req: NextApiRequest, res: NextApiResponse) {
  const providers = [
    CredentialsProvider({
      name: 'Credential',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'johndoe@email.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      // async authorize(credential, req) {
      //   return { ...credential };
      // },
    }),
  ];

  return await nextAuth(req, res, {
    providers: providers,
  });
}

export { auth as GET };
export { auth as POST };
