"use server";
import { z } from "zod";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/actions/user";
import bcrypt from "bcryptjs";
import { LoginSchema } from "@/schemas/authSchemas";
import { paths } from "@/lib/paths";

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null
) => {
  const validateState = LoginSchema.safeParse(values);
  if (!validateState) {
    return { error: "Invalid fields" };
  }
  const { email, password } = values;
  const exisitingUser = await getUserByEmail(email.toLowerCase());
  if (!exisitingUser || !exisitingUser.email) {
    return { error: "Invalid credentials" };
  }

  // if (!exisitingUser.password) {
  //   return { error: "Please Setup your Password. Check email for setup link or contact Admin" };
  // }

  const passwordsMatch = await bcrypt.compare(password, exisitingUser.password);
  if (!passwordsMatch) return { error: "Invalid Credentials!" };

  // if (!exisitingUser.status && exisitingUser.userType !== "company" ) {
  //   return { error: "You cannot login. Contact Administration!" };
  // }
  let DEFAULT_REDIRECT_URL = paths.admin.dashboard;
 
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_REDIRECT_URL,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Something went wrong" };
      }
    }
    throw error;
  }
};
