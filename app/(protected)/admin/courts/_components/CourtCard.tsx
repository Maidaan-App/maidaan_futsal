/* eslint-disable @next/next/no-img-element */
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Eye, Edit, Trash } from "lucide-react";
import Link from "next/link";
import { paths } from "@/lib/paths";
import { MINIOURL } from "@/lib/constants";
import { COURT } from "@/lib/types";
import { useAdminDeleteCourtByIdMutation } from "@/store/api/Admin/adminCourts";
import AlertDialogBox from "@/components/AlertDialogBox";
import { toast } from "sonner";

interface CourtCardProps {
  courtData: COURT;
}

const CourtCard: React.FC<CourtCardProps> = ({ courtData }) => {
  const [showConfirmation, setShowConfirmation] = React.useState(false);

  const formatTime = (time: Date) => {
    return new Date(time).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };
  const [deleteById] = useAdminDeleteCourtByIdMutation();

  const confirmDelete = async (itemId: string) => {
    toast.promise(
      deleteById(itemId)
        .unwrap()
        .then((response) => {
          return response.message || "Deleted Successfully!";
        })
        .catch((error) => {
          throw error.data.message || "Error while deleting";
        }),
      {
        loading: "Deleting...",
        success: (message) => <b>{message}</b>,
        error: (message) => <b>{message}</b>,
      }
    );
  };
  return (
    <div
      // href={`${paths.admin.addBookings}?id=${courtData._id}`}
      className="bg-white rounded-lg overflow-hidden p-4 flex gap-4 flex-col "
    >
      <img
        src={`${MINIOURL}${courtData.image}`}
        alt={courtData.name}
        className="h-[182px] w-full object-cover rounded-md"
      />
      <div className=" flex justify-between">
        <div>
          {" "}
          <h2 className="text-lg text-[#28353D] font-medium mb-2">
            {courtData.name}
          </h2>
          <p className="text-[#28353D80] text-normal text-base">
            {`Opening Time: ${formatTime(courtData.openingTime)} - ${formatTime(
              courtData.closingTime
            )}`}
          </p>
        </div>
        <div className="flex mt-8">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <BsThreeDotsVertical className="w-6 h-6" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="shadow-md">
              <Link href={`${paths.admin.addBookings}?id=${courtData._id}`}>
                <DropdownMenuItem className="cursor-pointer">
                  <Eye className="w-4 h-4 mr-2" /> View
                </DropdownMenuItem>
              </Link>
              <Link href={`${paths.admin.editCourts}?id=${courtData._id}`}>
                <DropdownMenuItem className="cursor-pointer">
                  <Edit className="w-4 h-4 mr-2" /> Edit
                </DropdownMenuItem>
              </Link>

              <AlertDialogBox
                onCancel={() => setShowConfirmation(false)}
                onConfirm={() => confirmDelete(courtData._id)}
                text={"Delete"}
              ></AlertDialogBox>

              {/* <DropdownMenuItem
                onClick={() => confirmDelete(courtData._id)}
                className="text-red-500 cursor-pointer"
              >
                <Trash className="w-4 h-4 mr-2" /> Delete
              </DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default CourtCard;
