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
import SCNSingleImagePicker from "@/components/image-picker/SCNSingleImagePicker";
import { poppins } from "@/app/lib/constants";
import { MINIOURL } from "@/lib/constants";

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

const AdminProfileEditForm = ({ type, ExistingDetail }: any) => {
  const [Loading, setLoading] = useState(false);

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
    <div className={`w-full h-full ${poppins.className}`}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={`flex flex-col lg:flex-row gap-5 font-normal text-[1rem]`}
        >
          <div className="w-full lg:w-[35%] flex flex-col gap-7 lg:p-4">
            <SCNSingleImagePicker
              variant="avatar"
              schemaName="logo"
            ></SCNSingleImagePicker>
          </div>
          <div className="w-full lg:w-[65%] bg-white border-[#0A41CC] border-opacity-[10%] p-5 rounded-md flex flex-col gap-5 mt-6 h-fit">
            <div className="flex flex-col lg:flex-row w-full gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full lg:w-1/2">
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
                  <FormItem className="w-full lg:w-1/2">
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

            <div className="flex flex-col lg:flex-row w-full gap-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="w-full lg:w-1/2">
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
                  <FormItem className="w-full lg:w-1/2">
                    <FormControl>
                      <TextField
                        id="outlined-basic"
                        label="Address"
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
                  Save Changes
                </Button>
              )}
            </div>
          </div>
        </form>
      </Form>
      {/* Media Query for Mobile View */}
      <style jsx>{`
        @media (max-width: 768px) {
          form {
            flex-direction: column;
            align-items: center;
          }
          .flex-col {
            width: 100%;
          }
          .w-full {
            width: 100%;
          }
          .gap-4 {
            gap: 1rem;
          }
          .lg\\:w-1\\/2 {
            width: 100%;
          }
          .p-4 {
            padding: 1rem;
          }
          .mt-6 {
            margin-top: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminProfileEditForm;
