"use client";
import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";

import TextField from "@mui/material/TextField";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { toast } from "sonner";
import { uploadToMinIO } from "@/lib/helper";
import { paths } from "@/lib/paths";
import { useRouter } from "next/navigation";
import { MINIOURL } from "@/lib/constants";
import SCNSingleImagePicker from "@/components/image-picker/SCNSingleImagePicker";
import { poppins } from "@/app/lib/constants";

const formSchema = z.object({
  logo: z.any({
    message: "Logo is Required!",
  }),
  name: z.string().min(2, {
    message: "Please Enter Full Name",
  }),
  address: z.string().min(2, {
    message: " Address is required",
  }),

  phone: z.string().min(2, {
    message: "Phone Number is required",
  }),
  email: z.string().email(),
});

const UsersVendorForm = ({ type, ExistingDetail }: any) => {
  const [Loading, setLoading] = useState(false);
  const router = useRouter();

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1899 }, (_, i) => 1900 + i);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: ExistingDetail?.name || "",
      logo: ExistingDetail?.logo ? `${MINIOURL}${ExistingDetail?.logo}` : null,
      address: ExistingDetail?.address || "",
      phone: ExistingDetail?.phone || "",
      email: ExistingDetail?.email || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("values", values);
  };
  return (
    <div className={`w-full h-full  ${poppins.className} `}>
          <h1 className="font-medium text-[#232D42] text-[1.5rem] p-4">Add New Player</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={` flex gap-5  ${poppins.className} font-normal text-[1rem]`}
        >
        
          <div className="w-[35%] flex flex-col gap-7 p-4 ">
            <SCNSingleImagePicker
            //   name="Company Logo"
              variant="avatar"
              schemaName="logo"
            ></SCNSingleImagePicker>
          </div>
          <div className="w-[65%] bg-white border-[1px] border-[#0A41CC] border-opacity-[10%] p-5 rounded-md flex flex-col gap-5 mt-6 h-fit">
            <div className="flex w-full gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="lg:w-1/2">
                    <FormControl>
                      <TextField
                        id="outlined-basic"
                        label="Full Name"
                        variant="outlined"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="lg:w-1/2">
                    <FormControl>
                      <TextField
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex w-full gap-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="lg:w-1/2">
                    <FormControl>
                      <TextField
                        id="outlined-basic"
                        label="Contact"
                        variant="outlined"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="lg:w-1/2">
                    <FormControl>
                      <TextField
                        id="outlined-basic"
                        label="Address"
                        variant="outlined"
                        className="w-full"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end my-2">
              {Loading ? (
                <div>
                  <div className="loader"></div>
                </div>
              ) : (
                <Button
                  type="submit"
                  className="bg-primary text-white px-5 rounded-md py-1 hover:bg-blue-900"
                >
                  Submit
                </Button>
              )}
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UsersVendorForm;
