import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { poppins } from "@/app/lib/constants";
import { Button } from "./ui/button";
import { User } from "lucide-react";
import Link from "next/link";
import { paths } from "@/lib/paths";

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

const ReusableTable = <T extends { id: number; [key: string]: any }>({
  data,
  columns,
  filterTabs,
  statusKey,
  sortOptions,
  searchKeys,
}: ReusableTableProps<T>) => {
  const [selectedTab, setSelectedTab] = useState<string>("All");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [sortOrder, setSortOrder] = useState<string>(sortOptions[0].value);
  const [searchQuery, setSearchQuery] = useState<string>("");

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

  const toggleSelectItem = (id: number) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const selectAllItems = () => {
    if (selectedItems.length === filteredData.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredData.map((item) => item.id));
    }
  };

  const deleteItems = () => {
    if (confirm("Are you sure you want to delete the selected items?")) {
      console.log("Deleting selected items:", selectedItems);
      alert(`Deleting items with IDs: ${selectedItems.join(", ")}`);
      setSelectedItems([]);
    }
  };

  const handleIndividualDelete = (id: number) => {
    if (confirm(`Are you sure you want to delete the item with ID: ${id}?`)) {
      console.log(`Deleting item with ID: ${id}`);
      alert(`Item with ID ${id} deleted`);
    }
  };

  return (
    <div className={`bg-white p-6 rounded-lg shadow-lg ${poppins.className}`}>
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
        <div className="flex flex-wrap">
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
      <div className="flex gap-4 items-center my-5">
        <Select
          value={sortOrder}
          onValueChange={(value) => setSortOrder(value)}
        >
          <SelectTrigger className="w-fit lg:w-64">
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
          className="px-4 py-2 border rounded-lg w-fit lg:flex-grow"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Link href={`${paths.admin.addplayertable}`}>
          <Button variant={"default"} className="flex gap-3 items-center">
            <User className="h-[1.2rem] w-[1.2rem]" />
            New Player
          </Button>
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-max">
          <thead>
            <tr className="text-left text-[1rem] font-medium uppercase tracking-wider text-[#8A92A6] bg-[#F5F6FA]">
              <th className="px-4 py-2">
                <input
                  type="checkbox"
                  onChange={selectAllItems}
                  checked={
                    selectedItems.length === filteredData.length &&
                    filteredData.length > 0
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
          <tbody key={selectedTab} className="transition-opacity duration-500">
            {filteredData.map((item) => (
              <tr
                key={item.id}
                className="border-b hover:bg-gray-50 text-[1rem] font-normal text-[#28353D] cursor-pointer h-16 opacity-0 animate-fadeIn"
              >
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => toggleSelectItem(item.id)}
                  />
                </td>
                {columns.map((column, index) => (
                  <td key={index} className="px-4 py-2">
                    {column.render
                      ? column.render(item)
                      : item[column.accessor]}
                  </td>
                ))}
                <td className="px-4 py-2">
                  <button
                    className="text-white mr-2 bg-primary px-5 py-2 rounded-full"
                    onClick={() => alert(`Editing item with ID: ${item.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white  px-5 py-2 rounded-full"
                    onClick={() => handleIndividualDelete(item.id)}
                  >
                    Delete
                  </button>
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
        <div className="flex space-x-2">
          {selectedItems.length > 0 && (
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
              onClick={deleteItems}
            >
              Delete Selected
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReusableTable;