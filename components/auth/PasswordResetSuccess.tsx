"use client";

import { useState } from "react";
import Copyright from "../Copyright";
import Description from "../Description";
import Heading from "../Heading";
import { Button } from "../ui/button";
import SetNewPassword from "./SetNewPassword";
import { AnimatePresence, motion } from "framer-motion";

const PasswordResetSuccess = ({ onContinue, onBackToLogin }: any) => {
  const [showSetNewPassword, setShowSetNewPassword] = useState(true);

  return (
    <>
      <AnimatePresence>
        {showSetNewPassword ? (
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
                description={`We have sent a password reset link in your email`}
              />
              <p className="font-normal text-[1rem] mb-6 text-[#1E1E1E] px-1 lg:px-0">
                maidaan@gmail.com
              </p>

              <div className="px-2 lg:px-0">

              <Button
                variant={"default"} 
                className="w-full mb-4"
                onClick={() => setShowSetNewPassword(false)}
              >
                Continue
              </Button>
              <Button
                variant={"outline"}
                className="w-full"
                onClick={onBackToLogin}
              >
                Back to login
              </Button>
              </div>

              <p className="mt-4 text-sm text-center lg:text-start">
                Didn&apos;t receive the mail?{" "}
                <a href="#" className="text-[#3169FF] font-medium">
                  Click to resend
                </a>
              </p>
              <Copyright />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="forgot-password"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 1 }}
          >
            <SetNewPassword onPasswordReset={onBackToLogin} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PasswordResetSuccess;
