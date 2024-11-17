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
import { courtShifts, MINIOURL } from "@/lib/constants";
import SCNSingleImagePicker from "@/components/image-picker/SCNSingleImagePicker";
import { poppins } from "@/lib/constants";
import { paths } from "@/lib/paths";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useAdminAddUpdateCourtsMutation } from "@/store/api/Admin/adminCourts";
import { FaSpinner } from "react-icons/fa";

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
    morningShift: z.object({
      startTime: z.instanceof(Date).refine((data) => data !== null, {
        message: "Start time is required",
      }),
      endTime: z.instanceof(Date).refine((data) => data !== null, {
        message: "End time is required",
      }),
      price: z.string().min(1, { message: "Price is required" }),
    }),
    dayShift: z.object({
      startTime: z.instanceof(Date).refine((data) => data !== null, {
        message: "Start time is required",
      }),
      endTime: z.instanceof(Date).refine((data) => data !== null, {
        message: "End time is required",
      }),
      price: z.string().min(1, { message: "Price is required" }),
    }),
    eveningShift: z.object({
      startTime: z.instanceof(Date).refine((data) => data !== null, {
        message: "Start time is required",
      }),
      endTime: z.instanceof(Date).refine((data) => data !== null, {
        message: "End time is required",
      }),
      price: z.string().min(1, { message: "Price is required" }),
    }),
    holidayShift: z.object({
      startTime: z.instanceof(Date).refine((data) => data !== null, {
        message: "Start time is required",
      }),
      endTime: z.instanceof(Date).refine((data) => data !== null, {
        message: "End time is required",
      }),
      price: z.string().min(1, { message: "Price is required" }),
    }),
  })
  .refine((data) => data.openingTime < data.closingTime, {
    message: "Opening time must be earlier than Closing time",
    path: ["openingTime"],
  })
  .refine(
    (data) => {
      if (data.holidayShift?.startTime && data.holidayShift?.endTime) {
        return data.holidayShift.startTime < data.holidayShift.endTime;
      }
      return true;
    },
    {
      message:
        "Holiday shift start time must be earlier than holiday shift end time",
      path: ["holidayShift", "endTime"],
    }
  )
  .refine(
    (data) =>
      data.openingTime.getTime() === data.morningShift.startTime.getTime(),
    {
      message: "Morning Shift Start time must match with Opening time",
      path: ["morningShift", "startTime"],
    }
  )
  .refine(
    (data) =>
      data.morningShift.endTime.getTime() === data.dayShift.startTime.getTime(),
    {
      message: "Day Shift Start time must match with Morning Shift end time",
      path: ["dayShift", "startTime"],
    }
  )
  .refine(
    (data) =>
      data.dayShift.endTime.getTime() === data.eveningShift.startTime.getTime(),
    {
      message: "Evening Shift Start time must match with Day Shift end time",
      path: ["eveningShift", "startTime"],
    }
  )
  .refine(
    (data) =>
      data.closingTime.getTime() === data.eveningShift.endTime.getTime(),
    {
      message: "Evening Shift end time must match with Closing time",
      path: ["eveningShift", "endTime"],
    }
  );

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
        morningShift: {
          startTime: ExistingDetail?.morningShift?.startTime
            ? new Date(ExistingDetail?.morningShift?.startTime)
            : undefined,
          endTime: ExistingDetail?.morningShift?.endTime
            ? new Date(ExistingDetail?.morningShift?.endTime)
            : undefined,
          price: ExistingDetail?.morningShift?.price ?? "0",
        },
        dayShift: {
          startTime: ExistingDetail?.dayShift?.startTime
            ? new Date(ExistingDetail?.dayShift?.startTime)
            : undefined,
          endTime: ExistingDetail?.dayShift?.endTime
            ? new Date(ExistingDetail?.dayShift?.endTime)
            : undefined,
          price: ExistingDetail?.dayShift?.price ?? "0",
        },
        eveningShift: {
          startTime: ExistingDetail?.eveningShift?.startTime
            ? new Date(ExistingDetail?.eveningShift?.startTime)
            : undefined,
          endTime: ExistingDetail?.eveningShift?.endTime
            ? new Date(ExistingDetail?.eveningShift?.endTime)
            : undefined,
          price: ExistingDetail?.eveningShift?.price ?? "0",
        },
        holidayShift: {
          startTime: ExistingDetail?.holidayShift?.startTime
            ? new Date(ExistingDetail?.holidayShift?.startTime)
            : undefined,
          endTime: ExistingDetail?.holidayShift?.endTime
            ? new Date(ExistingDetail?.holidayShift?.endTime)
            : undefined,
          price: ExistingDetail?.holidayShift?.price ?? "0",
        },
      });
    }
  }, [ExistingDetail]);

  const openingTime = form.watch("openingTime");
  const closingTime = form.watch("closingTime");
  const morningEndTime = form.watch("morningShift.endTime");
  const dayEndTime = form.watch("dayShift.endTime");

  useEffect(() => {
    if (openingTime) {
      form.setValue("morningShift.startTime", openingTime);
    }
    if(closingTime){
      form.setValue("eveningShift.endTime", closingTime);
    }
    if(morningEndTime){
      form.setValue("dayShift.startTime", morningEndTime);
    }
    if(dayEndTime){
      form.setValue("eveningShift.startTime", dayEndTime);
    }
  }, [openingTime,closingTime,morningEndTime,dayEndTime]);

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
                          views={["hours"]}
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
                          views={["hours"]}
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

              {/* Shifts */}
              <div className="flex flex-col gap-3 my-4">
                <h3>Morning Shift</h3>
                <div className="flex gap-4">
                  <FormField
                    control={form.control}
                    name={`morningShift.startTime`}
                    render={({ field }) => (
                      <FormItem className="lg:w-1/3">
                        {/* <FormLabel>Start Time</FormLabel> */}
                        <FormControl>
                          <TimePicker
                            // disabled
                            label="Start Time"
                            value={field.value ? dayjs(field.value) : null}
                            views={["hours"]}
                            onChange={(value) =>
                              field.onChange(value?.toDate())
                            }
                            ampm
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`morningShift.endTime`}
                    render={({ field }) => (
                      <FormItem className="lg:w-1/3">
                        {/* <FormLabel>End Time</FormLabel> */}
                        <FormControl>
                          <TimePicker
                            label="End Time"
                            value={field.value ? dayjs(field.value) : null}
                            views={["hours"]}
                            onChange={(value) =>
                              field.onChange(value?.toDate())
                            }
                            ampm
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`morningShift.price`}
                    render={({ field }) => (
                      <FormItem className="lg:w-1/3">
                        {/* <FormLabel>Price</FormLabel> */}
                        <FormControl>
                          <TextField
                            label="Price"
                            variant="outlined"
                            type="number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3 my-4">
                <h3>Day Shift</h3>
                <div className="flex gap-4">
                  <FormField
                    control={form.control}
                    name={`dayShift.startTime`}
                    render={({ field }) => (
                      <FormItem className="lg:w-1/3">
                        {/* <FormLabel>Start Time</FormLabel> */}
                        <FormControl>
                          <TimePicker
                            label="Start Time"
                            value={field.value ? dayjs(field.value) : null}
                            views={["hours"]}
                            onChange={(value) =>
                              field.onChange(value?.toDate())
                            }
                            ampm
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`dayShift.endTime`}
                    render={({ field }) => (
                      <FormItem className="lg:w-1/3">
                        {/* <FormLabel>End Time</FormLabel> */}
                        <FormControl>
                          <TimePicker
                            label="End Time"
                            value={field.value ? dayjs(field.value) : null}
                            views={["hours"]}
                            onChange={(value) =>
                              field.onChange(value?.toDate())
                            }
                            ampm
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`dayShift.price`}
                    render={({ field }) => (
                      <FormItem className="lg:w-1/3">
                        {/* <FormLabel>Price</FormLabel> */}
                        <FormControl>
                          <TextField
                            label="Price"
                            variant="outlined"
                            type="number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3 my-4">
                <h3>Evening Shift</h3>
                <div className="flex gap-4">
                  <FormField
                    control={form.control}
                    name={`eveningShift.startTime`}
                    render={({ field }) => (
                      <FormItem className="lg:w-1/3">
                        {/* <FormLabel>Start Time</FormLabel> */}
                        <FormControl>
                          <TimePicker
                            label="Start Time"
                            value={field.value ? dayjs(field.value) : null}
                            views={["hours"]}
                            onChange={(value) =>
                              field.onChange(value?.toDate())
                            }
                            ampm
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`eveningShift.endTime`}
                    render={({ field }) => (
                      <FormItem className="lg:w-1/3">
                        {/* <FormLabel>End Time</FormLabel> */}
                        <FormControl>
                          <TimePicker
                            // disabled
                            label="End Time"
                            value={field.value ? dayjs(field.value) : null}
                            views={["hours"]}
                            onChange={(value) =>
                              field.onChange(value?.toDate())
                            }
                            ampm
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`eveningShift.price`}
                    render={({ field }) => (
                      <FormItem className="lg:w-1/3">
                        {/* <FormLabel>Price</FormLabel> */}
                        <FormControl>
                          <TextField
                            label="Price"
                            variant="outlined"
                            type="number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3 my-4">
                <h3>Holiday (Saturday)</h3>
                <div className="flex gap-4">
                  <FormField
                    control={form.control}
                    name={`holidayShift.startTime`}
                    render={({ field }) => (
                      <FormItem className="lg:w-1/3">
                        {/* <FormLabel>Start Time</FormLabel> */}
                        <FormControl>
                          <TimePicker
                            label="Start Time"
                            value={field.value ? dayjs(field.value) : null}
                            views={["hours"]}
                            onChange={(value) =>
                              field.onChange(value?.toDate())
                            }
                            ampm
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`holidayShift.endTime`}
                    render={({ field }) => (
                      <FormItem className="lg:w-1/3">
                        {/* <FormLabel>End Time</FormLabel> */}
                        <FormControl>
                          <TimePicker
                            label="End Time"
                            value={field.value ? dayjs(field.value) : null}
                            views={["hours"]}
                            onChange={(value) =>
                              field.onChange(value?.toDate())
                            }
                            ampm
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`holidayShift.price`}
                    render={({ field }) => (
                      <FormItem className="lg:w-1/3">
                        {/* <FormLabel>Price</FormLabel> */}
                        <FormControl>
                          <TextField
                            label="Price"
                            variant="outlined"
                            type="number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
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
      </LocalizationProvider>
    </div>
  );
};

export default CourtAddEditForm;
