import connectDB from '@/config/database'
import User from '@/models/User'
import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { IUser } from '@/models/User'
import {
  type DefaultSession,
  type DefaultUser,
} from "next-auth"

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      name: string;
      email: string,
      image: string
    };
    username: string; // Here you are telling typescript that you session will have the username property, if you want your client to have access to this property
  }
}
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code'
        }
      }
    })
  ],
  callbacks: {
    // Invoked on successful sign in
    async signIn(params) {
      const { profile } = params
      // 1. connect to db
      // 2. check if user exists
      // 3. if not, create user
      // 4. return true to allow sign in
      await connectDB()
      const userExists = await User.findOne({ email: profile?.email })
      if (!userExists) {
        // Truncate username if too long
        const username = profile?.name?.slice(0, 20)

        await User.create({
          email: profile?.email,
          username,
          image: profile?.image
        })
      }
      return true
    },
    // Session callback function that modifies the session object
    async session( { session}) {
      // 1. Get user from database
      // 2. Assign user id from the session
      // 3. Return session
      const user = await User.findOne({email: session.user?.email})
      if (session.user) {
        session.user!.id = user._id.toString()
      }
      return session
    }
  }
}