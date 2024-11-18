"use client";

import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { poppins } from "@/lib/constants";
import { Button } from "./ui/button";
import {
  Edit,
  EllipsisVertical,
  Eye,
  MessageCircleWarning,
  Trash,
  User,
} from "lucide-react";
import Link from "next/link";
import { paths } from "@/lib/paths";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { BsThreeDotsVertical } from "react-icons/bs";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const reportSchema = z.object({
  category: z.string().min(1, "Report category is required"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long")
    .max(500, "Description must be less than 500 characters"),
});

export type Column<T> = {
  header: string;
  accessor: keyof T;
  render?: (data: T) => React.ReactNode;
};

type ReusableTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  filterTabs: string[];
  statusKey: keyof T;
  sortOptions: { label: string; value: string }[];
  searchKeys: (keyof T)[];
};

const ReusableTable = <T extends { _id: string; [key: string]: any }>({
  data,
  columns,
  filterTabs,
  statusKey,
  sortOptions,
  searchKeys,
}: ReusableTableProps<T>) => {
  const [selectedTab, setSelectedTab] = useState<string>("All");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<string>(sortOptions[0].value);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const pathname = usePathname();
  const isPlayertableRoute = pathname === paths.admin.players;

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
        ? new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
        : new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime()
    );

  const toggleSelectItem = (_id: string) => {
    setSelectedItems((prev) =>
      prev.includes(_id)
        ? prev.filter((itemId) => itemId !== _id)
        : [...prev, _id]
    );
  };

  const selectAllItems = () => {
    setSelectedItems(
      selectedItems.length === paginatedData.length
        ? []
        : paginatedData.map((item) => item._id)
    );
  };

  const deleteItems = () => {
    if (confirm("Are you sure you want to delete the selected items?")) {
      console.log("Deleting selected items:", selectedItems);
      alert(`Deleting items with IDs: ${selectedItems.join(", ")}`);
      setSelectedItems([]);
    }
  };

  const handleIndividualDelete = (_id: string) => {
    if (confirm(`Are you sure you want to delete the item with ID: ${_id}?`)) {
      console.log(`Deleting item with ID: ${_id}`);
      alert(`Item with ID ${_id} deleted`);
    }
  };

  // Pagination Logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = "auto"; // Re-enable scrolling
    }
    return () => {
      document.body.style.overflow = "auto"; // Clean up on unmount
    };
  }, [isModalOpen]);

  const form = useForm<z.infer<typeof reportSchema>>({
    resolver: zodResolver(reportSchema),
  });

  const onSubmit = async (values: z.infer<typeof reportSchema>) => {
    console.log("Report Information:", values);
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg ${poppins.className} p-5`}>
      {/* Filter Tabs and Controls */}
      <div className="flex overflow-x-auto justify-between items-center md:space-y-0">
        <div className="flex">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              className={`capitalize ${
                selectedTab === tab ? "border-b-2 border-green-500" : ""
              } flex items-center space-x-1 px-3 py-1  ${
                selectedTab === tab ? " text-green-800" : ""
              }`}
              onClick={() => setSelectedTab(tab)}
            >
              <span>{tab}</span>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  tab === "enrolled"
                    ? "bg-green-100 text-green-800"
                    : tab === "pending"
                    ? "bg-blue-100 text-blue-800"
                    : tab === "blocked"
                    ? "bg-red-100 text-red-800"
                    : tab === "Pre-booked"
                    ? "bg-[#FFAC301A] text-orange-800"
                    : tab === "Booked"
                    ? "bg-[#0098581A] text-green-800"
                    : tab === "Cancelled"
                    ? "bg-[#D8211D1A] text-red-800"
                    : tab === "Reserved"
                    ? "bg-[#0A41CC1A] text-blue-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {tab === "All" ? data.length : getStatusCount(tab)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Sorting, Search, and Add New Button */}
      <div className="flex flex-col lg:flex-row lg:justify-between gap-4 my-5 w-full">
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
          className="px-4 py-2 border rounded-lg w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {isPlayertableRoute && (
          <Link href={`${paths.admin.addPlayers}`}>
            <Button
              variant={"default"}
              className="flex gap-3 items-center w-full md:w-auto"
            >
              <User className="h-[1.2rem] w-[1.2rem]" />
              New Player
            </Button>
          </Link>
        )}
      </div>

      {/* Table Data */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-max">
          <thead>
            <tr className="text-left text-[1rem] font-medium uppercase tracking-wider text-[#8A92A6] bg-[#F5F6FA]">
              <th className="px-4 py-2">
                <input
                  type="checkbox"
                  onChange={selectAllItems}
                  checked={
                    selectedItems.length === paginatedData.length &&
                    paginatedData.length > 0
                  }
                />
              </th>
              {columns.map((column, index) => (
                <th key={index} className="px-4 py-2">
                  {column.header}
                </th>
              ))}
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item) => (
              <tr
                key={item._id}
                className="border-b hover:bg-gray-50 text-[1rem] font-normal text-[#28353D] cursor-pointer h-16"
              >
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item._id)}
                    onChange={() => toggleSelectItem(item._id)}
                  />
                </td>
                {columns.map((column, index) => (
                  <td key={index} className="px-4 py-2">
                    {column.render
                      ? column.render(item)
                      : item[column.accessor]}
                  </td>
                ))}

                <DropdownMenu>
                  <DropdownMenuTrigger className="p-5">
                    <BsThreeDotsVertical className="w-6 h-6" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="shadow-md">
                    <Link
                      href={`${paths.admin.players}/profile?id=${item._id}`}
                    >
                      <DropdownMenuItem className="cursor-pointer">
                        <Eye className="w-4 h-4 mr-2" /> View
                      </DropdownMenuItem>
                    </Link>
                    <Link href={`${paths.admin.editPlayers}?id=${item._id}`}>
                      <DropdownMenuItem className="cursor-pointer">
                        <Edit className="w-4 h-4 mr-2" /> Edit
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => setIsModalOpen(true)}
                    >
                      <MessageCircleWarning className="w-4 h-4 mr-2" /> Report
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={() => setIsModalOpen(false)}
        >
          {/* Modal Content */}
          <div
            className="bg-white w-[90%] max-w-md p-6 rounded-lg shadow-lg transform transition duration-300 ease-out animate-slide-in"
            onClick={(e) => e.stopPropagation()} // Prevent click propagation
          >
            <h2 className="text-[1.5rem] font-medium mb-4 text-[#28353D]">
              Report Player
            </h2>

            {/* Report Category */}

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)} // Properly handles and validates form submission
                className="mt-4 w-full space-y-3"
              >
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full border-[1px] border-[#919EAB33] border-opacity-20 py-5">
                              <SelectValue placeholder="Select a report category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Category 1">
                              Category 1
                            </SelectItem>
                            <SelectItem value="Category 2">
                              Category 2
                            </SelectItem>
                            <SelectItem value="Category 3">
                              Category 3
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <textarea
                          {...field}
                          placeholder="Provide a detailed description"
                          className="w-full border-[1px] border-[#919EAB33] border-opacity-20 px-5 py-5 rounded-xl"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-4">
                  <button
                    className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-green-600"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      )}

      <style>
        {`
          @keyframes slide-in {
            from {
              transform: translateY(-50%);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
          .animate-slide-in {
            animation: slide-in 0.4s ease-out forwards;
          }
        `}
      </style>

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Showing {currentPage * itemsPerPage - itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, filteredData.length)} of{" "}
          {filteredData.length} results
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReusableTable;
