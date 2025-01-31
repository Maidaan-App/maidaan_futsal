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
import { Layout } from "@/components/custom/layout";
import { Search } from "@/components/search";
import ThemeSwitch from "@/components/theme-switch";
import { UserNav } from "@/components/user-nav";
import { FaSpinner } from "react-icons/fa";

const FormSchema = z.object({
  images: z.array(z.any()).min(1, "Please select at least one image."),
});

const GalleryDetailForm = ({ current_user }: any) => {
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
    <Layout>
      {/* ===== Top Heading ===== */}
      <Layout.Header sticky>
        <Search />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeSwitch />
          <UserNav current_user={current_user} />
        </div>
      </Layout.Header>
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
        </form>
      </Form>
    </Layout>
  );
};

export default GalleryDetailForm;
