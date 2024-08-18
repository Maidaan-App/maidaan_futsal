"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import AuthLayout from "@/components/AuthLayout";
import Heading from "@/components/Heading";
import Description from "@/components/Description";
import { poppins } from "@/app/lib/constants";
import ForgotPassword from "@/components/auth/ForgotPassword";
import { AnimatePresence, motion } from "framer-motion";

const formSchema = z.object({
  email: z.string().min(2, {
    message: "Email must be at least 2 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be 8 characters.",
  }),
});

const Loginpage = () => {
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const handleBackToLogin = () => {
    setShowForgotPassword(false);
  };

  return (
    <AuthLayout>
      <AnimatePresence>
        {!showForgotPassword ? (
          <motion.div
            key="forgot-password"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <Form {...form}>
              <div className="mb-4">
                <img
                  src="/Group.png"
                  alt=""
                  className="h-[3.4475rem] w-[4.625rem] mx-auto md:mx-0"
                />
                <Heading heading={`Glad to see you again!`} />
                <Description
                  description={`Enter Maidaan to play, compete & conquer.`}
                />
              </div>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your email address"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <div
                    className={`flex justify-between w-full items-center ${poppins.className}`}
                  >
                    <label
                      htmlFor="terms"
                      className={`text-sm leading-none peer-disabled:cursor-not-allowed text-[#3F484A]  text-[0.875rem] font-normal`}
                    >
                      Remember me
                    </label>

                    <button
                      type="button"
                      onClick={() => setShowForgotPassword(true)}
                      className="text-[#3169FF] font-medium text-[0.875rem]"
                    >
                      Forgot password?
                    </button>
                  </div>
                </div>

                <Button variant={"default"} type="submit" className="w-full">
                  Login
                </Button>
              </form>
            </Form>
          </motion.div>
        ) : (
          <motion.div
            key="forgot-password"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 1 }}
          >
            <ForgotPassword onBackToLogin={handleBackToLogin} />
          </motion.div>
        )}
      </AnimatePresence>
    </AuthLayout>
  );
};

export default Loginpage;
