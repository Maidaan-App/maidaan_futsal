import React, { useEffect, useState } from "react";
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
import { useAdminAddUpdateProfileMutation } from "@/store/api/Admin/adminProfile";
import { toast } from "sonner";
import { uploadToMinIO } from "@/lib/helper";

const formSchema = z.object({
  image: z.any({
    message: "Image is Required!",
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

const AdminProfileEditForm = ({ type, ExistingDetail, current_user }: any) => {
  const [Loading, setLoading] = useState(false);
  const [AdminAddUpdateProfile] = useAdminAddUpdateProfileMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: ExistingDetail?.name || "",
      image: ExistingDetail?.image
        ? `${MINIOURL}${ExistingDetail?.image}`
        : null,
      address: ExistingDetail?.address || "",
      phone: ExistingDetail?.phone || "",
      email: current_user?.email || "",
    },
  });

  useEffect(() => {
    if (ExistingDetail) {
      form.reset({
        name: ExistingDetail?.name || "",
        image: ExistingDetail?.image
          ? `${MINIOURL}${ExistingDetail?.image}`
          : null,
        address: ExistingDetail?.address || "",
        phone: ExistingDetail?.phone || "",
      });
    }
  }, [ExistingDetail]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      if (!values.image) {
        toast.error("Please select Image");
        return;
      }
      let ImageUrl = null;
      if (values.image != `${MINIOURL}${ExistingDetail?.image}`) {
        ImageUrl = await uploadToMinIO(values.image, "futsalprofile");
        if (ImageUrl === "") {
          toast.error("Image Upload Failed Please try again");
          return;
        }
      }

      const response = await AdminAddUpdateProfile({
        ...values,
        image: ImageUrl ?? ExistingDetail?.image,
      }).unwrap();
      if (response) {
        toast.success(response.message);
        setLoading(false);
      } else {
        toast.error(`Couldn't Update Profile`);
        setLoading(false);
      }
    } catch (error: any) {
      toast.error(error.data.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`w-full h-full ${poppins.className}`}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={`flex flex-col lg:flex-row gap-5 font-normal text-[1rem]`}
        >
          <div className="w-full lg:w-[35%] flex flex-col gap-7 ">
            <SCNSingleImagePicker
              variant="avatar"
              schemaName="image"
            ></SCNSingleImagePicker>
          </div>
          <div className="w-full lg:w-[65%] bg-white border-[#0A41CC] border-opacity-[10%] p-5 rounded-md flex flex-col gap-5 mt-2 h-fit">
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
                        disabled
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
                        type="number"
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
              <Button
                type="submit"
                disabled={Loading}
                className="bg-primary text-white px-5 rounded-md py-1 hover:bg-blue-900"
              >
                Save Changes
              </Button>
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
