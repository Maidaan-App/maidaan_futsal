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
import PasswordResetSuccess from "./PasswordResetSuccess";
import Heading from "../Heading";
import Description from "../Description";
import { AnimatePresence, motion } from "framer-motion";

const formSchema = z.object({
  email: z.string().min(2, {
    message: "Email must be at least 2 characters.",
  }),
});

const ForgotPassword = ({ onBackToLogin }: any) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setIsSubmitted(true);
  }

  return (
    <>
      <AnimatePresence>
        {isSubmitted ? (
          <motion.div
            key="forgot-password-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <PasswordResetSuccess onBackToLogin={onBackToLogin} />
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

                <Button variant={"default"} type="submit" className="w-full">
                  Reset password
                </Button>

                <Button
                  variant={"outline"}
                  className="w-full"
                  onClick={onBackToLogin}
                  type="button"
                >
                  Back to login
                </Button>
              </form>
            </Form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ForgotPassword;
