"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { AnimatePresence, motion } from "framer-motion";
import Heading from "@/components/Heading";
import Description from "@/components/Description";
import PasswordResetSuccess from "@/components/auth/PasswordResetSuccess";
import AuthLayout from "@/components/AuthLayout";
import Link from "next/link";
import { paths } from "@/lib/paths";
import { useAuthForgotPasswordMutation } from "@/store/api/Auth/auths";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().min(2, {
    message: "Email is Required.",
  }),
});

const ForgotPasswordPage = () => {
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [ForgotPassword] = useAuthForgotPasswordMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const response = await ForgotPassword({
        ...values,
      }).unwrap();
      toast.success("Reset Email Sent !!");
      setUserEmail(values.email)
      form.reset({ email: "" });
      setIsSuccessful(true);
      setLoading(false);
    } catch (error) {
      toast.error(`Something went wrong !!`);
      setLoading(false);
    }
  }

  return (
    <AuthLayout>
      <AnimatePresence>
        {isSuccessful ? (
          <motion.div
            key="forgot-password-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <PasswordResetSuccess userEmail={userEmail} />
          </motion.div>
        ) : (
          <motion.div
            key="forgot-password-form"
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
                <Heading heading={`Forgot Password`} />
                <Description
                  description={`No worries, we’ll send you instructions for reset.`}
                />
              </div>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 px-4 lg:px-0"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your email address"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  variant={"default"}
                  type="submit"
                  disabled={loading}
                  className="w-full"
                >
                  Reset password
                </Button>

                <Button variant={"outline"} className="w-full" type="button">
                  <Link className="w-full" href={paths.auth.login}>
                    Back to login
                  </Link>
                </Button>
              </form>
            </Form>
          </motion.div>
        )}
      </AnimatePresence>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
