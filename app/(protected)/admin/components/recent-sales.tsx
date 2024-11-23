import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { MINIOURL } from "@/lib/constants";
import { paths } from "@/lib/paths";
import Link from "next/link";

export function RecentSales({ DashboardData }: any) {
  return (
    <div className="space-y-1">
      {DashboardData.recentBookings &&
        DashboardData.recentBookings.length > 0 &&
        DashboardData.recentBookings.map((data: any, index: number) => (
          <Link
            href={`${paths.admin.editBookings}?id=${data._id}`}
            key={index}
          >
            <div className="flex items-center hover:bg-slate-100 rounded-sm py-1.5 px-2 my-1">
              <Avatar className="h-9 w-9">
                <AvatarImage
                  src={`${MINIOURL}${data.image}`}
                  alt={data.name}
                  className="object-cover"
                />
                <AvatarFallback>
                  {data.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{data.name}</p>
                <p className="text-sm text-muted-foreground">{data.phone}</p>
              </div>
              <div className="ml-auto font-medium">
                <span
                  className={`${
                    data.status === "Reserved"
                      ? "bg-[#009858] bg-opacity-10 text-[#009858]"
                      : data.status === "Pre-Booked"
                      ? "bg-[#0A41CC] bg-opacity-[8%] text-[#0A41CC]"
                      : data.status === "Booked"
                      ? "bg-[#D8211D] bg-opacity-10 text-[#D8211D]"
                      : data.status === "Completed"
                      ? "bg-[#009858] bg-opacity-10 text-[#1e855a]"
                      : data.status === "Cancelled"
                      ? "bg-[#D8211D] bg-opacity-10 text-[#ce3e3c]"
                      : ""
                  } px-5 py-3 rounded-lg text-xs font-semibold`}
                >
                  {data.status}
                </span>
              </div>
            </div>
            {index < DashboardData.recentBookings.length - 1 && <Separator />}
          </Link>
        ))}
    </div>
  );
}
