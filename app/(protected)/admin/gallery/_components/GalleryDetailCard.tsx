import { MINIOURL, poppins } from "@/lib/constants";

import React from "react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { GALLERY } from "@/lib/types";
import { useAdminDeleteGalleryMutation } from "@/store/api/Admin/adminGallery";
import { EllipsisVertical } from "lucide-react";
import AlertDialogBox from "@/components/AlertDialogBox";

interface GalleryDetailCardProps {
  galleryDetail:GALLERY;
}

const GalleryDetailCard: React.FC<GalleryDetailCardProps> = ({
  galleryDetail
}) => {
  const [deleteById] = useAdminDeleteGalleryMutation();

  const handleDelete = async (itemId: string) => {
    toast.promise(deleteById(itemId).unwrap(), {
      loading: "Deleting...",
      success: <b>Deleted</b>,
      error: <b>Error while deleting</b>,
    });
  };

  return (
    <div
      className={`bg-white shadow-md rounded-lg p-5 flex flex-col w-full  ${poppins.className}`}
    >
      <div className="flex justify-end mb-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="">
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <EllipsisVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <AlertDialogBox
              onCancel={() => null}
              onConfirm={() => handleDelete(galleryDetail._id)}
              text={"Delete"}
            ></AlertDialogBox>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <img
        src={`${MINIOURL}${galleryDetail.image}`}
        alt="gallery image"
        className="h-48 w-full mb-4 object-cover"
      />
    </div>
  );
};

export default GalleryDetailCard;
