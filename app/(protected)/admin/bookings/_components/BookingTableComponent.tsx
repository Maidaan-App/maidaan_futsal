"use client";

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { poppins } from "@/app/lib/constants";
import { User } from "lucide-react";
import Link from "next/link";
import { paths } from "@/lib/paths";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export type Column<T> = {
  header: string;
  accessor: keyof T;
  render?: (data: T) => React.ReactNode;
};

type BookingTableComponentProps<T> = {
  data: T[];
  columns: Column<T>[];
  filterTabs: string[];
  statusKey: keyof T;
  sortOptions: { label: string; value: string }[];
  searchKeys: (keyof T)[];
};

const BookingTableComponent = <T extends { _id: string; [key: string]: any }>({
  data,
  columns,
  filterTabs,
  statusKey,
  sortOptions,
  searchKeys,
}: BookingTableComponentProps<T>) => {
  const [selectedTab, setSelectedTab] = useState<string>("All");
  const [sortOrder, setSortOrder] = useState<string>(sortOptions[0].value);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const pathname = usePathname();

  // Check if the current route matches "/admin/playertable"
  const isBookingtableRoute = pathname === paths.admin.bookings;

  const getStatusCount = (status: string) => {
    return data.filter((item) => item[statusKey] === status).length;
  };

  const filteredData = data
    .filter((item) =>
      selectedTab === "All" ? true : item[statusKey] === selectedTab
    )
    .filter((item) =>
      searchKeys.some((key) =>
        String(item[key]).toLowerCase().includes(searchQuery.toLowerCase())
      )
    )
    .sort((a, b) =>
      sortOrder === "newest"
        ? new Date(b.date).getTime() - new Date(a.date).getTime()
        : new Date(a.date).getTime() - new Date(b.date).getTime()
    );



  return (
    <div className={`bg-white  rounded-lg shadow-lg ${poppins.className} p-5`}>
      <div className="flex overflow-x-auto justify-between items-center  md:space-y-0">
        <div className="flex ">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              className={`${
                selectedTab === tab ? "border-b-2 border-green-500" : ""
              } flex items-center space-x-1 px-3 py-1  ${
                selectedTab === tab ? " text-green-800" : ""
              }`}
              onClick={() => setSelectedTab(tab)}
            >
              <span>{tab}</span>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  tab === "Active"
                    ? "bg-green-100 text-green-800"
                    : tab === "Pending"
                    ? "bg-blue-100 text-blue-800"
                    : tab === "Banned"
                    ? "bg-red-100 text-red-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {tab === "All" ? data.length : getStatusCount(tab)}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 my-5">
        <Select
          value={sortOrder}
          onValueChange={(value) => setSortOrder(value)}
        >
          <SelectTrigger className="w-full lg:w-64">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 border rounded-lg w-fit "
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {isBookingtableRoute && (
          <Link href={`${paths.admin.addPlayers}`}>
            <Button
              variant={"default"}
              className="flex gap-3 items-center w-full md:w-auto"
            >
              <User className="h-[1.2rem] w-[1.2rem]" />
              Create Booking
            </Button>
          </Link>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-max">
          <thead>
            <tr className="text-left text-[1rem] font-medium uppercase tracking-wider text-[#8A92A6] bg-[#F5F6FA]">
              {columns.map((column, index) => (
                <th key={index} className="px-4 py-2">
                  {column.header}
                </th>
              ))}
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody key={selectedTab} className="transition-opacity duration-500">
            {filteredData.map((item) => (
              <tr
                key={item._id}
                className="border-b hover:bg-gray-50 text-[1rem] font-normal text-[#28353D] cursor-pointer h-16 opacity-0 animate-fadeIn"
              >
                {columns.map((column, index) => (
                  <td key={index} className="px-4 py-2">
                    {column.render
                      ? column.render(item)
                      : item[column.accessor]}
                  </td>
                ))}
                <td className="px-4 py-2">
                  <Link
                    href={`${paths.admin.editBookings}?id=${item._id}`}
                    className="text-white mr-2 bg-primary px-5 py-2 rounded-full"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Showing 1 to {filteredData.length} of {filteredData.length} results
        </p>
        
      </div>
    </div>
  );
};

export default BookingTableComponent;
