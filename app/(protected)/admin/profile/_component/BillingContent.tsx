import React from "react";
import Plan from "./Plan";
import BillingAddressContent from "./BillingAddressContent";
import BillingInvoice from "./BillingInvoice";
import { BILLINGS } from "@/lib/types";

interface props {
  BillingDetail: BILLINGS | undefined;
}

const BillingContent = ({BillingDetail}:props) => {
  return (
    <div className="flex flex-col gap-6">
      <Plan />
      <BillingAddressContent ExistingDetail={BillingDetail} />
      <BillingInvoice />
    </div>
  );
};

export default BillingContent;
