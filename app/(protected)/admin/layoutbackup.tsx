/* eslint-disable @next/next/no-img-element */
import React from "react";
import AdminSidebar from "@/components/AdminSidebar";
import PublicSidebar from "@/components/PublicSidebar";
import { Inter, Poppins } from "next/font/google";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { currentUser } from "@/lib/auth";
import { MINIOURL } from "@/lib/constants";
import Link from "next/link";
import { paths } from "@/lib/paths";
import { Bell, MessageSquareMore, Search } from "lucide-react";
import Logout from "@/components/auth/Logout";
import { Separator } from "@/components/ui/separator";
import {
  CommandIcon,
  Comment01Icon,
  Notification02Icon,
  Search01Icon,
} from "hugeicons-react";

const inter = Inter({ subsets: ["latin"] });
const pop = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser();
  return (
    <div className={`flex w-full ${pop.className} h-screen fixed `}>
      <div className="z-50 w-fit  flex  lg:hidden overflow-y-auto">
        <PublicSidebar />
      </div>

      <div className="z-50 w-fit h-screen hidden  lg:flex">
        <AdminSidebar />
      </div>

      {/* Main Content */}
      <main className="w-full bg-[#F4F4F5] overflow-auto">
        <div className="flex flex-col lg:flex-row justify-between items-center bg-white  p-5 sticky top-0 gap-3 z-50">
          <div className="relative">
            <input
              type="text"
              className="bg-[#F4F4F5] outline-none border-none rounded-lg px-7 py-2"
              placeholder="Search.... "
            />

            <div className="absolute top-0 bottom-0 left-2 flex items-center">
              <Search01Icon size={15} color={"#8A92A6"} />
            </div>

            <div className="absolute top-0 bottom-0 right-2 flex items-center">
              <CommandShortcut className="flex justify-between items-center bg-white p-1 rounded-lg">
                <CommandIcon size={15} />P
              </CommandShortcut>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <div className="bg-[#F4F4F5] rounded-xl p-2 h-[2.8125rem] w-[2.8125rem] flex items-center justify-center  ">
              <Notification02Icon size={24} color={"#8A92A6"} />
            </div>
            <div className="bg-[#F4F4F5] rounded-xl p-2 h-[2.8125rem] w-[2.8125rem] flex items-center justify-center">
              <Comment01Icon size={24} color={"#8A92A6"} />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer">
                  <img
                    src={`https://plus.unsplash.com/premium_photo-1693756973030-b521b522afb7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
                    alt=""
                    className="h-[2.8125rem] w-[2.8125rem] rounded-full"
                  />
                  <div className={`${inter.className}`}></div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem className="hover:bg-primary hover:text-[#f1f1f1]">
                  <Link href={paths.admin.profile}>My Profile</Link>
                </DropdownMenuItem>
                <Separator className="" />
                <DropdownMenuItem className="hover:bg-primary hover:text-[#f1f1f1]">
                  <Logout />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {children}
      </main>
    </div>
  );
};

export default layout;
