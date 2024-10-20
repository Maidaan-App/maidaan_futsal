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
import { poppins } from "@/app/lib/constants";
import { paths } from "@/lib/paths";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useAdminAddUpdateCourtsMutation } from "@/store/api/Admin/adminCourts";

// Custom schema with time validation
const formSchema = z
  .object({
    image: z.any(),
    name: z.string().min(2, {
      message: "Please Enter Court Name",
    }),
    openingTime: z
      .instanceof(Date)
      .refine((data) => data !== null, { message: "Opening time is required" }),
    closingTime: z
      .instanceof(Date)
      .refine((data) => data !== null, { message: "Closing time is required" }),
  })
  .refine((data) => data.openingTime < data.closingTime, {
    message: "Opening time must be earlier than closing time",
    path: ["closingTime"],
  });

const CourtAddEditForm = ({ type, ExistingDetail }: any) => {
  const [Loading, setLoading] = useState(false);
  const router = useRouter();
  const [AdminAddUpdateCourt] = useAdminAddUpdateCourtsMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (ExistingDetail) {
      form.reset({
        name: ExistingDetail?.name || "",
        image: ExistingDetail?.image
          ? `${MINIOURL}${ExistingDetail?.image}`
          : null,
        openingTime: ExistingDetail?.openingTime
          ? new Date(ExistingDetail.openingTime)
          : undefined,
        closingTime: ExistingDetail?.closingTime
          ? new Date(ExistingDetail.closingTime)
          : undefined,
      });
    }
  }, [ExistingDetail]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      if (!values.image) {
        toast.error("Please select Court Image");
        return;
      }
      let ImageUrl = null;
      if (values.image != `${MINIOURL}${ExistingDetail?.image}`) {
        ImageUrl = await uploadToMinIO(values.image, "courts");
        if (ImageUrl === "") {
          toast.error("Court Image Upload Failed Please try again");
          return;
        }
      }
      const response = await AdminAddUpdateCourt({
        _id: ExistingDetail?._id ?? undefined,
        ...values,
        image: ImageUrl ?? ExistingDetail?.image,
      }).unwrap();
      if (response) {
        toast.success(response.message);
        setLoading(false);
        router.push(paths.admin.courts);
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
      <h1 className="font-medium text-[#232D42] text-[1.5rem] p-4">
        {type === "Add" ? "Add New Court" : "Edit Court"}
      </h1>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
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
                    <FormItem className="lg:w-full">
                      <FormControl>
                        <TextField
                          id="outlined-basic"
                          label="Court Name"
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
                  name="openingTime"
                  render={({ field }) => (
                    <FormItem className="lg:w-1/2">
                      <FormControl>
                        <TimePicker
                          label="Opening Time"
                          value={field.value ? dayjs(field.value) : null}
                          onChange={(value) => field.onChange(value?.toDate())}
                          className="w-full"
                          ampm
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="closingTime"
                  render={({ field }) => (
                    <FormItem className="lg:w-1/2">
                      <FormControl>
                        <TimePicker
                          label="Closing Time"
                          value={field.value ? dayjs(field.value) : null}
                          onChange={(value) => field.onChange(value?.toDate())}
                          className="w-full"
                          ampm
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
                  className="bg-primary text-[#f1f1f1] px-5 rounded-md py-1 hover:bg-blue-900"
                >
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </LocalizationProvider>
    </div>
  );
};

export default CourtAddEditForm;
