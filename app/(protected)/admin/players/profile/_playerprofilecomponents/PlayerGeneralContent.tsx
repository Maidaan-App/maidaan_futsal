"use client";
import React, { useEffect, useState } from "react";

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
import { useAdminAddUpdatePlayersMutation, useAdminPlayerReportMutation } from "@/store/api/Admin/adminPlayers";
import { paths } from "@/lib/paths";
import { FaSpinner } from "react-icons/fa";
import { MessageCircleWarning } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

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

const reportSchema = z.object({
  category: z.string().min(1, "Report category is required"),
  description: z
    .string()
    .min(5, "Description must be at least 5 characters long")
    .max(500, "Description must be less than 500 characters"),
});

const PlayerGeneralContent = ({ ExistingDetail }: any) => {
  const [Loading, setLoading] = useState(false);
  const [reporting, setReporting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();
  const [AdminAddUpdatePlayer] = useAdminAddUpdatePlayersMutation();
  const [AdminReportPlayer] = useAdminPlayerReportMutation();
  

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

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = "auto"; // Re-enable scrolling
    }
    return () => {
      document.body.style.overflow = "auto"; // Clean up on unmount
    };
  }, [isModalOpen]);

  const formModal = useForm<z.infer<typeof reportSchema>>({
    resolver: zodResolver(reportSchema),
  });

  const onSub = async (values: z.infer<typeof reportSchema>) => {
    try {
      setReporting(true);
      const response = await AdminReportPlayer({
        ...values,
        linkedPlayerId: ExistingDetail.linkedPlayerId
      }).unwrap();
      if (response) {
        toast.success(response.message);
        setReporting(false);
        setIsModalOpen(false)
        formModal.resetField("category")
        formModal.resetField("description")
      } else {
        toast.error(`Something Went Wrong`);
        setReporting(false);
      }
    } catch (error: any) {
      toast.error(error.data.message);
      setReporting(false);
    } finally {
      setReporting(false);
    }
  };

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
        window.location.reload();
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
          <div className="lg:w-[65%]   mx-4 lg:mx-0 ">
            <div className="bg-white  p-5 rounded-md flex flex-col gap-5 mt-6 h-fit">
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

            <div className="bg-white  p-5 rounded-md flex items-center  gap-8 mt-6 h-fit w-full">
              <div className="w-1/2 flex gap-5">
                <div className="flex flex-col items-center border-r-2 pr-3 gap-3">
                  <h1 className="text-[1.25rem] font-semibold text-[#28353D] leading-[1.25rem]">
                    150
                  </h1>
                  <p className="text-[#8A92A6] font-normal leading-[1.25rem]">
                    Total Hours Played
                  </p>
                </div>
                <div className="flex flex-col items-center border-r-2 pr-3 gap-3">
                  <h1 className="text-[1.25rem] font-semibold text-[#28353D] leading-[1.25rem]">
                    15
                  </h1>
                  <p className="text-[#8A92A6] font-normal leading-[1.25rem]">
                    Rank
                  </p>
                </div>
                <div className="flex flex-col items-center border-r-2 pr-3 gap-3">
                  <h1 className="text-[1.25rem] font-semibold text-[#28353D] leading-[1.25rem]">
                    150
                  </h1>
                  <p className="text-[#8A92A6] font-normal leading-[1.25rem]">
                    Points
                  </p>
                </div>
              </div>

              <div className="w-1/2 flex justify-end ">
                <div
                  className="cursor-pointer flex items-center border-[1px] border-[#8A92A6] rounded-xl px-5 py-2  font-medium text-[1rem] text-[#8A92A6]"
                  onClick={() => setIsModalOpen(true)}
                >
                  <MessageCircleWarning className="w-4 h-4 mr-2" /> Report
                  Player
                </div>
              </div>
            </div>

            <style>
              {`
          @keyframes slide-in {
            from {
              transform: translateY(-50%);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
          .animate-slide-in {
            animation: slide-in 0.4s ease-out forwards;
          }
        `}
            </style>
          </div>
        </form>
      </Form>

      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={() => setIsModalOpen(false)}
        >
          {/* Modal Content */}
          <div
            className="bg-white w-[90%] max-w-md p-6 rounded-lg shadow-lg transform transition duration-300 ease-out animate-slide-in"
            onClick={(e) => e.stopPropagation()} // Prevent click propagation
          >
            <h2 className="text-[1.5rem] font-medium mb-4 text-[#28353D]">
              Report Player
            </h2>

            {/* Report Category */}

            <Form {...formModal}>
              <form
                onSubmit={formModal.handleSubmit(onSub)} // Properly handles and validates form submission
                className="mt-4 w-full space-y-3"
              >
                <FormField
                  control={formModal.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full border-[1px] border-[#919EAB33] border-opacity-20 py-5">
                              <SelectValue placeholder="Select a report category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Category 1">
                              Category 1
                            </SelectItem>
                            <SelectItem value="Category 2">
                              Category 2
                            </SelectItem>
                            <SelectItem value="Category 3">
                              Category 3
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={formModal.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <textarea
                          {...field}
                          placeholder="Provide a detailed description"
                          className="w-full border-[1px] border-[#919EAB33] border-opacity-20 px-5 py-5 rounded-xl"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-4">
                  {/* <button
                    className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-green-600"
                    type="submit"
                  >
                    Submit
                  </button> */}
                  <Button
                    type="submit"
                    disabled={reporting}
                    className={`bg-primary text-[#f1f1f1] px-5 rounded-md py-1 hover:bg-[#33b98d]  Loading ? "bg-blue-700 cursor-not-allowed" : ""`}
                  >
                    {reporting ? (
                      <>
                        <FaSpinner className="animate-spin mr-2" />
                        Reporting
                      </>
                    ) : (
                      "Report"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerGeneralContent;
