import { prismadb } from "@/lib/prisma";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import axios from "axios";

/* function getGoogleCredentials(): { clientId: string; clientSecret: string } {
  const clientId = process.env.GOOGLE_ID;
  const clientSecret = process.env.GOOGLE_SECRET;
  if (!clientId || clientId.length === 0) {
    throw new Error("Missing GOOGLE_ID");
  }

  if (!clientSecret || clientSecret.length === 0) {
    throw new Error("Missing GOOGLE_SECRET");
  }

  return { clientId, clientSecret };
} */

export const authOptions: NextAuthOptions = {
  secret: process.env.JWT_SECRET,
  //adapter: PrismaAdapter(prismadb),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
    signOut: "/",
  },
  providers: [
    /*     GoogleProvider({
      clientId: getGoogleCredentials().clientId,
      clientSecret: getGoogleCredentials().clientSecret,
    }), */
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },

      async authorize(credentials) {
        //console.log(credentials, "credentials");
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user: any = await axios.get(
          `${process.env.WBLOW_ADMIN_URL}/api/accounts/${credentials.email}`
        );

        if (!user) {
          throw new Error("User not found");
        }

        if (!user || !user?.data.password) {
          throw new Error("Invalid credentials");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.data.password
        );

        if (!isCorrectPassword) {
          throw new Error("Invalid credentials - passwords do not match");
        }

        //console.log(user, "user");
        return user.data;
      },
    }),
  ],
  callbacks: {
    async session({ token, session }: any) {
      //If user not found in localDB, create new user

      const user: any = await axios.get(
        `${process.env.WBLOW_ADMIN_URL}/api/accounts/${session.user.email}`
      );

      if (!user) {
        throw new Error("User not found");
      }

      session.user.id = user.data.id;
      session.user.name = user.data.name;
      session.user.email = user.data.email;
      session.user.publicKey = user.data.publicKey;

      return session;
    },
  },
};
