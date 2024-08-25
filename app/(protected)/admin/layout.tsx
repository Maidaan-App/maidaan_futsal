import React from "react";
import AdminSidebar from "@/components/AdminSidebar";
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

const inter = Inter({ subsets: ["latin"] });
const pop = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser();
  return (
    <div className="flex h-screen w-full">
      {/* Sidebar */}
      <div className="z-50 w-fit h-full">
        <AdminSidebar />
      </div>
      {/* Main Content */}
      <main className="flex-grow bg-[#F4F4F5] p-6 overflow-auto">
        <div className="flex justify-between items-center bg-white rounded-md p-5">
          <div className="relative">
            <input
              type="text"
              className="bg-[#F4F4F5] outline-none border-none rounded-lg px-7 py-1"
              placeholder="Search for products"
            />

            <div className="absolute top-0 bottom-0 left-2 flex items-center">
              <Search className="h-[1rem] w-[1rem]" />
            </div>

            <div className="absolute top-0 bottom-0 right-2 flex items-center">
              <CommandShortcut>⌘P</CommandShortcut>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <div className="bg-[#F4F4F5] rounded-xl p-2 h-[2.8125rem] w-[2.8125rem] flex items-center justify-center  ">
              <Bell className="text-[#8A92A6]" />
            </div>
            <div className="bg-[#F4F4F5] rounded-xl p-2 h-[2.8125rem] w-[2.8125rem] flex items-center justify-center">
              <MessageSquareMore className="text-[#8A92A6] " />
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
                <DropdownMenuItem>
                  {/* <Link
                    href={`${paths.admin.profile}`}
                    className="text-black w-full p-1 cursor-pointer rounded-md"
                  >
                    My Profile
                  </Link> */}
                  <Logout />
                </DropdownMenuItem>
                <DropdownMenuItem>
                  {/* Logout component can be added here */}
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
