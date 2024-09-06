"use client";

import Copyright from "../Copyright";
import Description from "../Description";
import Heading from "../Heading";
import { Button } from "../ui/button";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { paths } from "@/lib/paths";
import { useAuthForgotPasswordMutation } from "@/store/api/Auth/auths";
import { toast } from "sonner";

const PasswordResetSuccess = ({ userEmail }: any) => {
  const [ForgotPassword] = useAuthForgotPasswordMutation();

  const handleResend = async () => {
    toast.success("Resend Successfull !!");
    await ForgotPassword({
      email: userEmail,
    }).unwrap();
  };
  return (
    <>
      <AnimatePresence>
        <motion.div
          key="forgot-password"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 1 }}
        >
          <div className="">
            <img
              src="/Group.png"
              alt=""
              className="h-[3.4475rem] w-[4.625rem] mx-auto lg:mx-0 mb-4 "
            />
            <Heading heading={`Forgot password`} />
            <Description
              description={`A password reset link has been sent in your email if it exists`}
            />
            <p className="font-normal text-[1rem] mb-6 text-[#1E1E1E] px-1 lg:px-0">
              {userEmail}
            </p>

            <div className="px-2 lg:px-0">
              <Link href={paths.auth.login}>
                <Button variant={"default"} className="w-full mb-4">
                  Back to login
                </Button>
              </Link>
            </div>

            <p className="mt-4 text-sm text-center lg:text-start">
              Didn&apos;t receive the mail?{" "}
              <button
                onClick={handleResend}
                className="text-[#3169FF] font-medium"
              >
                Click to resend
              </button>
            </p>
            <Copyright />
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default PasswordResetSuccess;
