import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/custom/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Comment01Icon, Notification02Icon } from "hugeicons-react";
import { paths } from "@/lib/paths";
import Link from "next/link";
import Logout from "./auth/Logout";
import { MINIOURL } from "@/lib/constants";

import NepaliDatePicker, { NepaliDate } from "@zener/nepali-datepicker-react";
import "@zener/nepali-datepicker-react/index.css";
import { useState } from "react";

export function UserNav({ current_user }: any) {
  const [value, setValue] = useState<NepaliDate | null>(new NepaliDate());
  console.log("value:",value)
  return (
    <div className="flex items-center gap-5">
      <NepaliDatePicker
        value={value}
        format="dddd, DD MMMM YYYY"
        onChange={(e) => {
          setValue(e);
        }}
        disabled
        className="bg-white font-semibold w-[180px]"
      />
      {/* <div className="bg-[#F4F4F5] rounded-xl p-2 h-[2.8125rem] w-[2.8125rem] flex items-center justify-center  ">
        <Notification02Icon size={24} color={"#8A92A6"} />
      </div> */}
      {/* <div className="bg-[#F4F4F5] rounded-xl p-2 h-[2.8125rem] w-[2.8125rem] flex items-center justify-center">
        <Comment01Icon size={24} color={"#8A92A6"} />
      </div> */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={`${MINIOURL}${current_user.image}`}
                alt={current_user.name}
              />
              <AvatarFallback>
                {current_user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {current_user.name}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {current_user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href={paths.admin.profile}>
            <DropdownMenuGroup>
              <DropdownMenuItem className="cursor-pointer">
                Profile
                {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
              </DropdownMenuItem>
              {/* <DropdownMenuItem>
              Billing
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem> */}
              {/* <DropdownMenuItem>
              Settings
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem> */}
              {/* <DropdownMenuItem>New Team</DropdownMenuItem> */}
            </DropdownMenuGroup>
          </Link>

          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Logout />
            {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
