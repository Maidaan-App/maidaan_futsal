"use client";

import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { poppins, ReportCategoryTypes } from "@/lib/constants";
import Link from "next/link";
import { paths } from "@/lib/paths";
import { Button } from "@/components/ui/button";
import { Calendar02Icon } from "hugeicons-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAdminPlayerReportMutation } from "@/store/api/Admin/adminPlayers";
import { toast } from "sonner";
import { FaSpinner } from "react-icons/fa";

const reportSchema = z.object({
  category: z.string().min(1, "Report category is required"),
  description: z
    .string()
    .min(5, "Description must be at least 5 characters long")
    .max(100, "Description must be less than 100 characters"),
});

export type Column<T> = {
  header: string;
  accessor: keyof T;
  render?: (data: T) => React.ReactNode;
};

type ReusableTableProps<T> = {
  data: T[];
  ExistingDetail:any;
  columns: Column<T>[];
  filterTabs: string[];
  statusKey: keyof T;
  sortOptions: { label: string; value: string }[];
  searchKeys: (keyof T)[];
};

const PlayerReportTableComponent = <
  T extends { _id: string; [key: string]: any }
>({
  data,
  ExistingDetail,
  columns,
  filterTabs,
  statusKey,
  sortOptions,
  searchKeys,
}: ReusableTableProps<T>) => {
  const [selectedTab, setSelectedTab] = useState<string>("All");
  const [sortOrder, setSortOrder] = useState<string>(sortOptions[0].value);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reporting, setReporting] = useState(false);
  const [AdminReportPlayer] = useAdminPlayerReportMutation();



  const getStatusCount = (status: string) => {
    return data.filter((item) => item[statusKey] === status).length;
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

  const formModal = useForm<z.infer<typeof reportSchema>>({
    resolver: zodResolver(reportSchema),
  });

  const onSub = async (values: z.infer<typeof reportSchema>) => {
    try {
      setReporting(true);
      const response = await AdminReportPlayer({
        ...values,
        linkedPlayerId: ExistingDetail.linkedUserId._id,
      }).unwrap();
      if (response) {
        toast.success(response.message);
        setReporting(false);
        setIsModalOpen(false);
        formModal.resetField("category");
        formModal.resetField("description");
      } else {
        toast.error(`Something Went Wrong`);
        setReporting(false);
      }
    } catch (error: any) {
      toast.error(error.data.message);
      setReporting(false);
    } finally {
      setReporting(false);
    }
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
        ? new Date(b.reportedDate).getTime() -
          new Date(a.reportedDate).getTime()
        : new Date(a.reportedDate).getTime() -
          new Date(b.reportedDate).getTime()
    );


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

  return (
    <div className={`bg-white rounded-lg shadow-lg ${poppins.className} p-5`}>
      {/* Filter Tabs and Controls */}
      <div className="flex overflow-x-auto justify-between items-center md:space-y-0">
        <div className="flex">
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
                  tab === "Payment Issue"
                    ? "bg-green-100 text-green-800"
                    : tab === "Behaviour Issue"
                    ? "bg-[#0A41CC1A] text-blue-800"
                    : tab === "Profanity"
                    ? "bg-[#FFAC301A] text-orange-800"
                    : tab === "Equipement Damage"
                    ? "bg-green-100 text-green-900"
                    : tab === "Other"
                    ? "bg-[#FFAC301A] text-red-900"
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

        {/* <Link href={`${paths.admin.addBookings}`}> */}
          <Button
            variant={"default"}
            className="flex gap-3 items-center w-full md:w-auto"
            onClick={() => setIsModalOpen(true)}
          >
            <Calendar02Icon className="h-[1.2rem] w-[1.2rem]" />
            New Report
          </Button>
        {/* </Link> */}
      </div>

      {/* Table Data */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-max">
          <thead>
            <tr className="text-left text-[1rem] font-medium uppercase tracking-wider text-[#8A92A6] bg-[#F5F6FA]">
              {columns.map((column, index) => (
                <th key={index} className="px-4 py-2">
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item) => (
              <tr
                key={item._id}
                className="border-b hover:bg-gray-50 text-[1rem] font-normal text-[#28353D] cursor-pointer h-16"
              >
                {columns.map((column, index) => (
                  <td key={index} className="px-4 py-2">
                    {column.render
                      ? column.render(item)
                      : item[column.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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

            <Form {...formModal}>
              <form
                onSubmit={formModal.handleSubmit(onSub)} // Properly handles and validates form submission
                className="mt-4 w-full space-y-3"
              >
                <FormField
                  control={formModal.control}
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
                            {ReportCategoryTypes.map((data, index) => (
                              <SelectItem key={index} value={data}>
                                {data}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={formModal.control}
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
                  <Button
                    type="submit"
                    disabled={reporting}
                    className={`bg-primary text-[#f1f1f1] px-5 rounded-md py-1 hover:bg-[#33b98d]  Loading ? "bg-blue-700 cursor-not-allowed" : ""`}
                  >
                    {reporting ? (
                      <>
                        <FaSpinner className="animate-spin mr-2" />
                        Reporting
                      </>
                    ) : (
                      "Report"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerReportTableComponent;
