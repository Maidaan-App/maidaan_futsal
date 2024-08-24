import React from "react";
import Plan from "./Plan";
import BillingAddressContent from "./BillingAddressContent";

const BillingContent: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <Plan />
      <BillingAddressContent />
    </div>
  );
};

export default BillingContent;
