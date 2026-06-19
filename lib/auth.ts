import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

import { authorizeCredentials } from "@/lib/credential-auth"
import { PLATFORM_LOGO_SRC, PLATFORM_NAME } from "@/lib/platform"

type SessionUserWithId = NonNullable<NextAuthOptions["callbacks"]> extends never
  ? never
  : {
      id?: string
      name?: string | null
      email?: string | null
      image?: string | null
      role?: string | null
    }

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Email and password",
      credentials: {
        mode: { label: "Mode", type: "text" },
        name: { label: "Name", type: "text" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        return authorizeCredentials({
          mode: credentials?.mode,
          name: credentials?.name,
          email: credentials?.email,
          password: credentials?.password,
        })
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.name = user.name
        token.email = user.email
        token.role = (user as any).role || "user"
      }

      return token
    },
    session({ session, token }) {
      if (session.user) {
        const sessionUser = session.user as SessionUserWithId

        sessionUser.id = typeof token.id === "string" ? token.id : undefined
        sessionUser.name = sessionUser.name ?? token.name
        sessionUser.email = sessionUser.email ?? token.email
        sessionUser.role = typeof token.role === "string" ? token.role : undefined
      }

      return session
    },
  },
  theme: {
    brandColor: "#f97316",
    colorScheme: "light",
    logo: PLATFORM_LOGO_SRC,
  },
  pages: {
    signIn: "/",
  },
  debug: process.env.NEXTAUTH_DEBUG === "true",
}

export const authProviderName = `${PLATFORM_NAME} credentials login`
