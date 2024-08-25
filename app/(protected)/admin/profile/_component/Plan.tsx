/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Button } from "@/components/ui/button";
import { poppins } from "@/app/lib/constants";

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
          <div className="mb-4">
            <img
              src="https://s3-alpha-sig.figma.com/img/9d41/04ff/386496a7d3e0c1bede8d1218c43fb779?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=h~mWxwxgVs-5XPaNCtTxY5IkJLqMvWX4Mv1cVveamgfN6aJIVIT-2zEY3Zw-jiSXCrSImY-rM6nY5PLpjwS4RJXlHZVEO40tERuWgnujcfKsWIq9M6TvCcKIM5LmKbrl-vCIfalaBZJO-SNepLIT27C4l1PzPCAlXVl5aI5i6riYC~4Yeo8kDodxEsx2i95VrPhUdxEtuEkWOaTf~vsNRr1P6tT8ajLvdYE6JJDNpylkA8JkKxlMo16huLUvCxV0dB0S-NLqCKKuo5N-arj06pbnrWk67mNq~Al8LhxBBQNkCwYtC7aRgHrTgr-JDYmE3ojaOMoivn9fWAGgxCUKFw__"
              alt="Plan Icon"
              className="w-[50px] h-[50px] rounded-md"
            />
          </div>
          <h3 className="text-[#28353D] font-medium text-lg mb-2">Basic</h3>
          <p className="text-[#00A86B] font-medium text-base">Free</p>
        </div>

        {/* Starter Plan - Current */}
        <div className="border border-[#00A86B] flex flex-col justify-between rounded-[12px] h-[200px] p-6">
          <div className="mb-4 flex justify-between items-center">
            <img
              src="https://s3-alpha-sig.figma.com/img/9d41/04ff/386496a7d3e0c1bede8d1218c43fb779?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=h~mWxwxgVs-5XPaNCtTxY5IkJLqMvWX4Mv1cVveamgfN6aJIVIT-2zEY3Zw-jiSXCrSImY-rM6nY5PLpjwS4RJXlHZVEO40tERuWgnujcfKsWIq9M6TvCcKIM5LmKbrl-vCIfalaBZJO-SNepLIT27C4l1PzPCAlXVl5aI5i6riYC~4Yeo8kDodxEsx2i95VrPhUdxEtuEkWOaTf~vsNRr1P6tT8ajLvdYE6JJDNpylkA8JkKxlMo16huLUvCxV0dB0S-NLqCKKuo5N-arj06pbnrWk67mNq~Al8LhxBBQNkCwYtC7aRgHrTgr-JDYmE3ojaOMoivn9fWAGgxCUKFw__"
              alt="Plan Icon"
              className="w-[50px] h-[50px] rounded-md"
            />
            <span className="text-[#00A86B] bg-[#E9F7EF] text-sm px-3 py-1 rounded-lg">
              Current
            </span>
          </div>
          <h3 className="text-[#28353D] font-medium text-lg mb-2">Starter</h3>
          <p className="font-normal text-base text-[#28353D]">
            Rs.{" "}
            <span className="text-primary font-medium text-[32px]">1500</span>{" "}
            <span className="text-[#8A92A6] text-base">/months</span>
          </p>
        </div>

        {/* Premium Plan */}
        <div className="border border-[#E3E3E3] flex flex-col justify-between rounded-[12px] h-[200px] p-6">
          <div className="mb-4 flex justify-between items-center">
            <img
              src="https://s3-alpha-sig.figma.com/img/9d41/04ff/386496a7d3e0c1bede8d1218c43fb779?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=h~mWxwxgVs-5XPaNCtTxY5IkJLqMvWX4Mv1cVveamgfN6aJIVIT-2zEY3Zw-jiSXCrSImY-rM6nY5PLpjwS4RJXlHZVEO40tERuWgnujcfKsWIq9M6TvCcKIM5LmKbrl-vCIfalaBZJO-SNepLIT27C4l1PzPCAlXVl5aI5i6riYC~4Yeo8kDodxEsx2i95VrPhUdxEtuEkWOaTf~vsNRr1P6tT8ajLvdYE6JJDNpylkA8JkKxlMo16huLUvCxV0dB0S-NLqCKKuo5N-arj06pbnrWk67mNq~Al8LhxBBQNkCwYtC7aRgHrTgr-JDYmE3ojaOMoivn9fWAGgxCUKFw__"
              alt="Plan Icon"
              className="w-[50px] h-[50px] rounded-md"
            />
          </div>
          <h3 className="text-[#28353D] font-medium text-lg mb-2">Premium</h3>
          <p className="font-normal text-base text-[#28353D]">
            Rs.{" "}
            <span className="text-primary font-medium text-[32px]">1500</span>{" "}
            <span className="text-[#8A92A6] text-base">/months</span>
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
      <div className="flex justify-end space-x-4">
        <Button variant="outline" className="text-[#FF5733] border-[#FF5733]">
          Cancel Subscription
        </Button>
        <Button variant="default" className="bg-[#00A86B] text-white">
          Upgrade Plan
        </Button>
      </div>
    </div>
  );
};

export default Plan;
