/* eslint-disable @next/next/no-img-element */
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Eye, Edit, Trash } from "lucide-react"; // Import Lucide icons
import Link from "next/link";

// Define the props interface
interface CourtCardProps {
  image: string;
  courtName: string;
  openingTime: string;
}

const CourtCard: React.FC<CourtCardProps> = ({
  image,
  courtName,
  openingTime,
}) => {
  return (
    <Link
      href={""}
      className="bg-white rounded-lg overflow-hidden p-4 flex gap-4 flex-col "
    >
      <img
        src={image}
        alt={courtName}
        className="h-[182px] w-full object-cover"
      />
      <div className=" flex justify-between">
        <div>
          {" "}
          <h2 className="text-lg text-[#28353D] font-medium mb-2">
            {courtName}
          </h2>
          <p className="text-[#28353D80] text-normal text-base">
            Opening Time: {openingTime}
          </p>
        </div>
        <div className="flex mt-8">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <BsThreeDotsVertical className="w-6 h-6" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="shadow-md">
              <DropdownMenuItem className="cursor-pointer">
                <Eye className="w-4 h-4 mr-2" /> View
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Edit className="w-4 h-4 mr-2" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-500 cursor-pointer">
                <Trash className="w-4 h-4 mr-2" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </Link>
  );
};

export default CourtCard;
