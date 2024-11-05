/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Button } from "@/components/ui/button";
import { poppins } from "@/lib/constants";
const Plan = () => {
  return (
    <div className={`${poppins.className} rounded-[12px] bg-white p-6`}>
      <h2 className="text-lg font-medium mb-2 text-[#28353D]">Change Plan</h2>
      <p className="text-[#8A92A6] font-normal text-base mb-6">
        You can upgrade and downgrade whenever you want.
      </p>

      {/* Plan Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Basic Plan */}
        <div className="border border-[#E3E3E3] flex flex-col justify-between rounded-[12px] h-[200px] p-6">
          <div className="">
            <img
              src="/images/plan1.png"
              alt="Plan Icon"
              className="w-[80px] h-[80px] rounded-md"
            />
          </div>
          <h3 className="text-[#28353D] font-medium text-lg mb-2">
            Kick-Off Pass
          </h3>
          {/* <p className="text-[#00A86B] font-medium text-base">Free</p> */}
          <p className="font-normal text-base text-[#28353D]">
            Rs.{" "}
            <span className="text-primary font-medium text-[32px]">1000</span>{" "}
            <span className="text-[#8A92A6] text-base">for 1 month</span>
          </p>
        </div>

        {/* Starter Plan - Current */}
        <div className="border border-[#00A86B] relative flex flex-col justify-between rounded-[12px] h-[200px] p-6">
          <div className=" flex justify-between items-center">
            <img
              src="/images/plan2.png"
              alt="Plan Icon"
              className="w-[80px] h-[80px] rounded-md"
            />
            <span className="text-[#00A86B] absolute right-4 top-4 bg-[#E9F7EF] text-sm px-3 py-1 rounded-lg">
              Current
            </span>
          </div>
          <h3 className="text-[#28353D] font-medium text-lg mb-2">
            Hat-Trick Pass
          </h3>
          <p className="font-normal text-base text-[#28353D]">
            Rs.{" "}
            <span className="text-primary font-medium text-[32px]">2500</span>{" "}
            <span className="text-[#8A92A6] text-base">for 3 months</span>
          </p>
        </div>

        {/* Premium Plan */}
        <div className="border border-[#E3E3E3] flex flex-col justify-between rounded-[12px] h-[200px] p-6">
          <div className=" flex justify-between items-center">
            <img
              src="/images/plan3.png"
              alt="Plan Icon"
              className="w-[80px] h-[80px] rounded-md"
            />
          </div>
          <h3 className="text-[#28353D] font-medium text-lg mb-2">
            Season Pass
          </h3>
          <p className="font-normal text-base text-[#28353D]">
            Rs.{" "}
            <span className="text-primary font-medium text-[32px]">10,000</span>{" "}
            <span className="text-[#8A92A6] text-base">for 12 months</span>
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <p className="text-[#28353D] font-medium text-base">Days</p>
          <p className="text-[#28353D] font-medium text-base">26 of 30 Days</p>
        </div>
        <div className="w-full h-2 bg-[#E9F7EF] rounded-full">
          <div className="h-full bg-[#00A86B] rounded-full w-[86%]"></div>
        </div>
        <p className="text-[#8A92A6] font-normal text-sm mt-2">
          4 days remaining
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex lg:flex-row flex-col gap-4 justify-end space-x-4">
        <Button variant="outline" className="text-[#FF5733] border-[#FF5733]">
          Cancel Subscription
        </Button>
        <Button variant="default" className="bg-[#00A86B] text-[#f1f1f1]">
          Upgrade Plan
        </Button>
      </div>
    </div>
  );
};

export default Plan;
