"use client";
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
import { toast } from "sonner";
import { uploadToMinIO } from "@/lib/helper";
import { useRouter } from "next/navigation";
import { MINIOURL } from "@/lib/constants";
import SCNSingleImagePicker from "@/components/image-picker/SCNSingleImagePicker";
import { poppins } from "@/lib/constants";
import { useAdminAddUpdatePlayersMutation } from "@/store/api/Admin/adminPlayers";
import { paths } from "@/lib/paths";
import { FaSpinner } from "react-icons/fa";

const formSchema = z.object({
  image: z.any(),
  name: z.string().min(2, {
    message: "Please Enter Full Name",
  }),
  address: z.string().optional(),
  phone: z.string().min(2, {
    message: "Phone Number is required",
  }),
  email: z.string().optional(),
});
true;
const PlayerGeneralContent = ({ ExistingDetail }: any) => {
  const [Loading, setLoading] = useState(false);
  const router = useRouter();
  const [AdminAddUpdatePlayer] = useAdminAddUpdatePlayersMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: ExistingDetail?.name || "",
      image: ExistingDetail?.image
        ? `${MINIOURL}${ExistingDetail?.image}`
        : null,
      address: ExistingDetail?.address || "",
      phone: ExistingDetail?.phone || "",
      email: ExistingDetail?.email || "",
    },
  });

  useEffect(() => {
    if (ExistingDetail) {
      form.reset({
        name: ExistingDetail?.name || "",
        image: ExistingDetail?.image
          ? `${MINIOURL}${ExistingDetail?.image}`
          : null,
        email: ExistingDetail?.email || "",
        address: ExistingDetail?.address || "",
        phone: ExistingDetail?.phone || "",
      });
    }
  }, [ExistingDetail]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      let ImageUrl = null;
      if (
        values.image &&
        values.image != `${MINIOURL}${ExistingDetail?.image}`
      ) {
        ImageUrl = await uploadToMinIO(values.image, "players");
        if (ImageUrl === "") {
          toast.error("Image Upload Failed Please try again");
          return;
        }
      }

      const response = await AdminAddUpdatePlayer({
        _id: ExistingDetail?._id ?? undefined,
        ...values,
        image: ImageUrl ?? ExistingDetail?.image,
      }).unwrap();
      if (response) {
        toast.success(response.message);
        setLoading(false);
        window.location.reload()
      } else {
        toast.error(`Something Went Wrong`);
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
    <div className={`w-full h-full  ${poppins.className} `}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={` flex flex-col lg:flex-row lg:gap-5  ${poppins.className} font-normal text-[1rem]`}
        >
          <div className="lg:w-[35%] flex flex-col gap-7 p-4 z-10">
            <SCNSingleImagePicker
              variant="avatar"
              schemaName="image"
            ></SCNSingleImagePicker>
          </div>
          <div className="lg:w-[65%] bg-white border-[1px] border-[#0A41CC] border-opacity-[10%] p-5 rounded-md flex flex-col gap-5 mt-6 h-fit mx-4 lg:mx-0">
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
                        type="number"
                        variant="outlined"
                        {...field}
                        className="w-full"
                        disabled
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
              <Button
                type="submit"
                disabled={Loading}
                className={`bg-primary text-[#f1f1f1] px-5 rounded-md py-1 hover:bg-[#33b98d]  Loading ? "bg-blue-700 cursor-not-allowed" : ""`}
              >
                {Loading ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    Submitting
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PlayerGeneralContent;

