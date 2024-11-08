/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Button } from "@/components/ui/button";
import { MINIOURL, poppins } from "@/lib/constants";
import { BILLINGS, PLANS } from "@/lib/types";
import { differenceInDays, formatDistanceToNow } from "date-fns";

interface props {
  PlansData: PLANS[];
  BillingDetail: BILLINGS;
}
const Plan = ({ PlansData, BillingDetail }: props) => {
  const subscribedDate = new Date(
    BillingDetail?.subscription?.subscribedDate as Date
  );
  const expiryDate = new Date(BillingDetail?.subscription?.expiryDate as Date);
  const currentDate = new Date();

  // Calculate total days of the plan
  const totalDays = differenceInDays(expiryDate, subscribedDate);

  // Calculate days used
  const daysUsed = differenceInDays(currentDate, subscribedDate);

  // Ensure daysUsed doesn't exceed totalDays
  const daysUsedClamped = Math.min(daysUsed, totalDays);

  // Calculate days remaining
  const daysRemaining = totalDays - daysUsedClamped;

  // Calculate percentage of days used
  const percentageUsed = (daysUsedClamped / totalDays) * 100;
  return (
    <div className={`${poppins.className} rounded-[12px] bg-white p-6`}>
      <h2 className="text-lg font-medium mb-2 text-[#28353D]">Change Plan</h2>
      <p className="text-[#8A92A6] font-normal text-base mb-6">
        You can upgrade and downgrade whenever you want.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {PlansData &&
          PlansData.length > 0 &&
          PlansData.map((plan, index) => {
            const isCurrentPlan =
              BillingDetail?.subscription?.planName === "Trial"
                ? index === 0 // First plan should be "Current" for "Trial"
                : plan.name === BillingDetail?.subscription?.planName;
            return (
              <div
                key={index}
                className={`border ${
                  isCurrentPlan ? "border-[#00A86B]" : "border-[#E3E3E3]"
                } relative flex flex-col justify-between rounded-[12px] h-[200px] p-6`}
              >
                <div className=" flex justify-between items-center">
                  <img
                    src={`${MINIOURL}${plan.image}`}
                    alt="Plan Icon"
                    className="w-[80px] h-[80px] rounded-md"
                  />
                  {isCurrentPlan && (
                    <span className="text-[#00A86B] absolute right-4 top-4 bg-[#E9F7EF] text-sm px-3 py-1 rounded-lg">
                      {BillingDetail?.subscription?.planName === "Trial"
                        ? "Current (Trial)"
                        : "Current"}
                    </span>
                  )}
                </div>
                <h3 className="text-[#28353D] font-medium text-lg mb-2">
                  {plan.name}
                </h3>
                <p className="font-normal text-base text-[#28353D]">
                  Rs.{" "}
                  <span className="text-primary font-medium text-[32px]">
                    {plan.price}
                  </span>{" "}
                  <span className="text-[#8A92A6] text-base">
                    for {plan.month} months
                  </span>
                </p>
              </div>
            );
          })}
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <p className="text-[#28353D] font-medium text-base">Days</p>
          <p className="text-[#28353D] font-medium text-base">
            {daysUsedClamped} of {totalDays} Days
          </p>
        </div>
        <div className="w-full h-2 bg-[#E9F7EF] rounded-full">
          <div
            className="h-full bg-[#00A86B] rounded-full"
            style={{ width: `${percentageUsed}%` }}
          ></div>
        </div>
        <p className="text-[#8A92A6] font-normal text-sm mt-2">
          {daysRemaining} {daysRemaining === 1 ? "day" : "days"} remaining
        </p>
      </div>

      {/* Action Buttons */}
      {/* <div className="flex lg:flex-row flex-col gap-4 justify-end space-x-4">
        <Button variant="outline" className="text-[#FF5733] border-[#FF5733]">
          Cancel Subscription
        </Button>
        <Button variant="default" className="bg-[#00A86B] text-[#f1f1f1]">
          Upgrade Plan
        </Button>
      </div> */}
    </div>
  );
};

export default Plan;
