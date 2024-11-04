"use client";

import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { paths } from "@/lib/paths";
import { uploadToMinIO } from "@/lib/helper";
import SCNMultiImagePicker from "@/components/image-picker/multi-image-picker";
import { useAdminAddUpdateGalleryMutation } from "@/store/api/Admin/adminGallery";

const FormSchema = z.object({
  images: z.array(z.any()).min(1, "Please select at least one image."),
});

const GalleryDetailForm = ({ linkedGalleryId }: any) => {
  const [Loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const router = useRouter();

  const [AdminAddGalleryImage] = useAdminAddUpdateGalleryMutation();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setLoading(true);
      if (data.images.length === 0) {
        toast.error("Please Select images");
        return;
      }
      const uploadedFileNames = await Promise.all(
        data.images.map(async (image) => {
          const uploadedFileName = await uploadToMinIO(image, "gallery");
          if (uploadedFileName === "") {
            throw new Error("Image upload failed");
          }
          return uploadedFileName;
        })
      );
      const formData = {
        images: uploadedFileNames,
      };
      const response = await AdminAddGalleryImage({
        ...formData,
      }).unwrap();
      if (response) {
        toast.success(response.message);
        router.push(`${paths.admin.gallery}`);
        setLoading(false);
      } else {
        toast.error(`Couldn't Add`);
        setLoading(false);
      }
    } catch (error) {
      toast.error(`Failed`);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 p-5 bg-white z-50 h-fit"
      >
        <h1 className="font-semibold text-2xl">Add Images</h1>
        <div className="flex w-full gap-4">
          <div className="w-1/2">
            <SCNMultiImagePicker
              name="Select Images"
              // limit={5}
              schemaName={`images`}
            />
          </div>
        </div>

        <Button disabled={Loading} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default GalleryDetailForm;
