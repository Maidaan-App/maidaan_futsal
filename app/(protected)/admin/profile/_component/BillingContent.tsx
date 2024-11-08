import React from "react";
import Plan from "./Plan";
import BillingAddressContent from "./BillingAddressContent";
import BillingInvoice from "./BillingInvoice";
import { BILLINGS, PLANS } from "@/lib/types";

interface props {
  BillingDetail: BILLINGS | undefined;
  PlansData: PLANS[] | undefined;
}

const BillingContent = ({ BillingDetail, PlansData }: props) => {
  console.log("BillingDetail:",BillingDetail)
  return (
    <div className="flex flex-col gap-6">
      {BillingDetail && PlansData && (
        <>
          <Plan BillingDetail={BillingDetail} PlansData={PlansData} />
          <BillingAddressContent ExistingDetail={BillingDetail} />
          {/* <BillingInvoice /> */}
        </>
      )}
    </div>
  );
};

export default BillingContent;
