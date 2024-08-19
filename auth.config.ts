import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./schemas/authSchemas";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (validatedFields.success) {
          return credentials;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
