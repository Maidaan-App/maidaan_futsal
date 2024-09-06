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
import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { LoginSchema } from "@/schemas/authSchemas";
import { login } from "@/actions/login";
import { toast } from "sonner";
import Link from "next/link";
import { paths } from "@/lib/paths";

const Loginpage = () => {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const callbackUrl = searchParams.get("callbackUrl");

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof LoginSchema>) {
    try {
      setLoading(true);
      const formData = {
        email: values.email.toLowerCase(),
        password: values.password,
      };
      await login(formData, callbackUrl).then((response) => {
        if (!response) {
          toast.success("Welcome to Maidaan");
        }
        if (response?.error) {
          toast.error(response.error);
        }
        setLoading(false);
      });
    } catch (error: any) {
      toast.error(`${error.message}`);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout>
      <AnimatePresence>
        <motion.div
          key="forgot-password"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <Form {...form}>
            <div className="mb-4 ">
              <img
                src="/Group.png"
                alt=""
                className="h-[3.4475rem] w-[4.625rem] mx-auto md:mx-0"
              />
              <Heading heading={`Glad to see you again!`} />
              <Description
                description={`Enter Maidaan to Play, Compete & Conquer.`}
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
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter password"
                        {...field}
                      />
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
                  <Link href={paths.auth.forgotpassword}>
                    <button
                      type="button"
                      className="text-[#3169FF] font-medium text-[0.875rem]"
                    >
                      Forgot password?
                    </button>
                  </Link>
                </div>
              </div>

              <Button
                disabled={loading}
                variant={"default"}
                type="submit"
                className="w-full"
              >
                Login
              </Button>
            </form>
          </Form>
        </motion.div>
      </AnimatePresence>
    </AuthLayout>
  );
};

export default Loginpage;
