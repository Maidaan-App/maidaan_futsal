import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import { getUserByEmail } from "./actions/user";
import bcrypt from "bcryptjs";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/login",
    error: "/error",
  },
  trustHost: true,
  callbacks: {
    async signIn({ user, account }:any) {
      if (account?.provider !== "credentials") return true;
      const existingUser = await getUserByEmail(user.email);
      if(existingUser){
        const passwordsMatch = await bcrypt.compare(
          user.password,
          existingUser.password as string
        );
        if (!passwordsMatch) return false;
      }else{
        return false
      }
      return true;
    },
    //@ts-ignore
    async session({ session, token }) {
      if (token.sub && session?.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.status = token.status;
        session.user.image = token.image;
        session.user.id = token.sub;
      }

      return session;
    },

    async jwt({ token }: any) {
      if (!token.sub) return token;
      const existingUser = await getUserByEmail(token.email!);
      if (!existingUser) return token;
      token.name = existingUser.name;
      token.role = existingUser.userType;
      token.email = existingUser.email;
      token.status = existingUser.status;
      token.image = existingUser.image;
      token.sub = existingUser.id.toString();

      return token;
    },
  },
  session: { strategy: "jwt" },
  ...authConfig,
  adapter: PrismaAdapter(db),
} as any);
