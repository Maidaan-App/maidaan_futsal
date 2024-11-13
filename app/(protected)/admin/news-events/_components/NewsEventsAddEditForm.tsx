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
import { paths } from "@/lib/paths";
import { useAdminAddUpdateNewsEventsMutation } from "@/store/api/Admin/adminNewsEvents";
import ReactQuillEditor from "@/components/ReactQuillEditor";
import { FaSpinner } from "react-icons/fa";

const formSchema = z.object({
  image: z.any(),
  title: z.string().min(2, {
    message: "Please Enter Title",
  }),
  description: z.string().min(2, {
    message: "Please Enter Description",
  }),
});

const NewsEventsAddEditForm = ({ type, ExistingDetail }: any) => {
  const [Loading, setLoading] = useState(false);
  const router = useRouter();
  const [AdminAddUpdateNewsEvent] = useAdminAddUpdateNewsEventsMutation();

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1899 }, (_, i) => 1900 + i);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: ExistingDetail?.title || "",
      image: ExistingDetail?.image
        ? `${MINIOURL}${ExistingDetail?.image}`
        : null,
      description: ExistingDetail?.description || "",
    },
  });

  useEffect(() => {
    if (ExistingDetail) {
      form.reset({
        title: ExistingDetail?.title || "",
        image: ExistingDetail?.image
          ? `${MINIOURL}${ExistingDetail?.image}`
          : null,
        description: ExistingDetail?.description || "",
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
      if (
        values.image &&
        values.image != `${MINIOURL}${ExistingDetail?.image}`
      ) {
        ImageUrl = await uploadToMinIO(values.image, "newsevents");
        if (ImageUrl === "") {
          toast.error("Image Upload Failed Please try again");
          return;
        }
      }

      const response = await AdminAddUpdateNewsEvent({
        _id: ExistingDetail?._id ?? undefined,
        ...values,
        image: ImageUrl ?? ExistingDetail?.image,
      }).unwrap();
      if (response) {
        toast.success(response.message);
        setLoading(false);
        router.push(paths.admin.newsevents);
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
        {type === "Add" ? "Add New News & Event" : "Edit News & Event"}
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={` flex flex-col lg:flex-row lg:gap-5  ${poppins.className} font-normal text-[1rem]`}
        >
          <div className="lg:w-[35%] flex flex-col gap-7 p-4 z-10">
            <SCNSingleImagePicker
              variant="imageBox"
              schemaName="image"
            ></SCNSingleImagePicker>
          </div>
          <div className="lg:w-[65%] bg-white border-[1px] border-[#0A41CC] border-opacity-[10%] p-5 rounded-md flex flex-col gap-5 mt-6 h-fit mx-4 lg:mx-0">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <TextField
                      id="outlined-basic"
                      label="Title"
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
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    {/* <TextField
                      id="outlined-basic"
                      label="Description"
                      variant="outlined"
                      {...field}
                      className="w-full"
                    /> */}
                    <div className={`flex flex-col gap-3`}>
                      <label className="font-normal text-[1rem] text-heading">
                        Description
                      </label>

                      <ReactQuillEditor name="description" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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

export default NewsEventsAddEditForm;
