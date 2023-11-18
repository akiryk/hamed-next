import GoogleProvider from 'next-auth/providers/google';
import EmailProvider from 'next-auth/providers/email';
import { MongoDBAdapter } from '@auth/mongodb-adapter';

import clientPromise from '@/lib/mongo/client';

const google = GoogleProvider({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET
});

const email = EmailProvider({
  server: {
    host: process.env.MAIL_SERVER_HOST,
    port: process.env.MAIL_SERVER_PORT,
    auth: {
      user: process.env.MAIL_SERVER_USER,
      pass: process.env.MAIL_SERVER_PASSWORD
    }
  },
  from: process.env.EMAIL_FROM
});

export const authOptions = {
  providers: [google, email],
  pages: {
    signIn: '/signin'
  },
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: 'jwt'
  }
};
