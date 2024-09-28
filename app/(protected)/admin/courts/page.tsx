import { poppins } from "@/app/lib/constants";
import { Button } from "@/components/ui/button";
import { SquarePlus } from "lucide-react";

import React from "react";
import CourtCard from "./Components/CourtCard";
import Link from "next/link";
import { paths } from "@/lib/paths";

const Courts = () => {
  return (
    <div className={`container my-5 ${poppins.className}`}>
      <div className="flex justify-between">
        <h2 className="text-[#232D42] font-medium text-2xl">
          My Futsal Grounds
        </h2>
        <Link href={paths.admin.addCourts}>
          {" "}
          <Button>
            <SquarePlus className="mr-2 w-6 h-6" />
            Add New Ground
          </Button>
        </Link>
      </div>
      <div className="flex gap-4">
        {" "}
        <CourtCard
          image="/images/court.png" // Replace with the actual path of your images
          courtName="Court 1"
          openingTime="7 AM - 6 PM"
        />
        <CourtCard
          image="/images/court.png"
          courtName="Court 2"
          openingTime="7 AM - 6 PM"
        />
      </div>
    </div>
  );
};

export default Courts;
