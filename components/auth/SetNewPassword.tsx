// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import Heading from "@/components/Heading";
// import Description from "@/components/Description";

// const formSchema = z.object({
//   newPassword: z.string().min(8, {
//     message: "Password must be at least 8 characters.",
//   }),
//   confirmPassword: z.string().min(8, {
//     message: "Password must be at least 8 characters.",
//   }),
// }).refine((data) => data.newPassword === data.confirmPassword, {
//   message: "Passwords do not match",
//   path: ["confirmPassword"], // path of error
// });

// const SetNewPassword = ({ onPasswordReset }: any) => {
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       newPassword: "",
//       confirmPassword: "",
//     },
//   });

//   function onSubmit(values: z.infer<typeof formSchema>) {
//     console.log(values);
//     // Handle password reset logic
//     onPasswordReset(); // Call the function to notify the reset is done
//   }

//   return (
//     <Form {...form}>
//       <div className="mb-4">
//         <img
//           src="/Group.png"
//           alt=""
//           className="h-[3.4475rem] w-[4.625rem]"
//         />
//         <Heading heading={`Set a new password`} />
//         <Description
//           description={`Password must be at least 8 characters.`}
//         />
//       </div>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//         <FormField
//           control={form.control}
//           name="newPassword"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>New password</FormLabel>
//               <FormControl>
//                 <Input placeholder="Enter new password" type="password" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="confirmPassword"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Confirm password</FormLabel>
//               <FormControl>
//                 <Input placeholder="Confirm your password" type="password" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <Button variant={"default"} type="submit" className="w-full">
//           Reset password
//         </Button>

//         <p className="mt-6 text-sm">© 2024 | maidaan.com</p>
//       </form>
//     </Form>
//   );
// };

// export default SetNewPassword;


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
import Heading from "@/components/Heading";
import Description from "@/components/Description";

const formSchema = z.object({
  newPassword: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  confirmPassword: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"], // path of error
});

const SetNewPassword = ({ onPasswordReset }: any) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Handle password reset logic
    onPasswordReset(); // Call the function to notify the reset is done
  }

  return (
    <Form {...form}>
      <div className="mb-4">
        <img
          src="/Group.png"
          alt=""
          className="h-[3.4475rem] w-[4.625rem]"
        />
        <Heading heading={`Set a new password`} />
        <Description
          description={`Password must be at least 8 characters.`}
        />
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New password</FormLabel>
              <FormControl>
                <Input placeholder="Enter new password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <Input placeholder="Confirm your password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button variant={"default"} type="submit" className="w-full">
          Reset password
        </Button>

        <p className="mt-6 text-sm">© 2024 | maidaan.com</p>
      </form>
    </Form>
  );
};

export default SetNewPassword;

