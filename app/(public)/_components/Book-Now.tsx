"use client";
import { useGetAllPublicCourtsQuery } from "@/store/api/Public/publicCourts";
import React from "react";
import Bookings from "./Bookings";

const BookNowSection = () => {
  const { data: CourtsData, isLoading: CourtsDataLoading } =
    useGetAllPublicCourtsQuery("");
  return <div>{CourtsData && <Bookings CourtsData={CourtsData} />}</div>;
};

export default BookNowSection;
