import React from "react";
import Plan from "./Plan";
import BillingAddressContent from "./BillingAddressContent";
import BillingInvoice from "./BillingInvoice";

const BillingContent: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <Plan />
      <BillingAddressContent />
      <BillingInvoice />
    </div>
  );
};

export default BillingContent;
