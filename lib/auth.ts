import { auth } from "@/auth";

export const currentUser = async () => {
  const session = await auth();
  return session?.user;
  // const user = {
  //   id: "66c35df0f1ead82cc3a4b79a",
  //   role:"admin"
  // }
  // return user;
};

export const currentRole = async () => {
  const session = await auth();
  return session?.user?.role;
};
