import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { poppins } from "@/app/lib/constants";
import { useAdminAddUpdateBillingMutation } from "@/store/api/Admin/adminBillings";
import { toast } from "sonner";
import { BILLINGS } from "@/lib/types";

// Validation schema using Zod
const validationSchema = z.object({
  companyName: z.string().min(1, "Company Name is required"),
  billingEmail: z
    .string()
    .email("Invalid email format")
    .min(1, "Billing Email is required"),
  billingPhone: z.string().min(1, "Billing Phone Number is required"),
  billingAddress: z.string().min(1, "Billing Address is required"),
});

interface props {
  ExistingDetail: BILLINGS | undefined;
}

const BillingAddressContent = ({ ExistingDetail }: props) => {
  const [Loading, setLoading] = useState(false);
  const [AdminAddUpdateBilling] = useAdminAddUpdateBillingMutation();
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      companyName: "",
      billingEmail: "",
      billingPhone: "",
      billingAddress: "",
    },
  });

  useEffect(() => {
    if (ExistingDetail) {
      reset({
        companyName: ExistingDetail?.companyName || "",
        billingEmail: ExistingDetail?.billingEmail || "",
        billingPhone: ExistingDetail?.billingPhone || "",
        billingAddress: ExistingDetail?.billingAddress || "",
      });
    }
  }, [ExistingDetail]);

  const onSubmit = async (values: z.infer<typeof validationSchema>) => {
    try {
      setLoading(true);
      const response = await AdminAddUpdateBilling({
        ...values,
      }).unwrap();
      if (response) {
        toast.success(response.message);
        setLoading(false);
      } else {
        toast.error(`Couldn't Update Profile`);
        setLoading(false);
      }
    } catch (error: any) {
      toast.error(error.data.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      className={`${poppins.className} p-6 bg-white rounded-[12px]`}
      component="form"
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
        rowGap: "26px", // Vertical gap between rows
        columnGap: "20px", // Increased horizontal gap between columns
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-lg font-medium mb-1 text-[#28353D]">
        Billing Information
      </h2>

      {/* Company Name - Full Width */}
      <Controller
        name="companyName"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            id="company-name"
            label="Company Name"
            variant="outlined"
            fullWidth
            error={!!errors.companyName}
            helperText={errors.companyName?.message}
            sx={{ gridColumn: { xs: "1 / -1", md: "1 / -1" } }}
          />
        )}
      />

      {/* Billing Email */}
      <Controller
        name="billingEmail"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            id="billing-email"
            label="Billing Email"
            variant="outlined"
            fullWidth
            error={!!errors.billingEmail}
            helperText={errors.billingEmail?.message}
          />
        )}
      />

      {/* Billing Phone Number */}
      <Controller
        name="billingPhone"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            id="billing-phone"
            type="number"
            label="Billing Phone Number"
            variant="outlined"
            fullWidth
            error={!!errors.billingPhone}
            helperText={errors.billingPhone?.message}
          />
        )}
      />

      {/* Billing Address - Full Width */}
      <Controller
        name="billingAddress"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            id="billing-address"
            label="Billing Address"
            variant="outlined"
            fullWidth
            error={!!errors.billingAddress}
            helperText={errors.billingAddress?.message}
            sx={{ gridColumn: { xs: "1 / -1", md: "1 / -1" } }}
          />
        )}
      />

      {/* Save Changes Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gridColumn: "1 / -1",
        }}
      >
        <Button
          variant="default"
          type="submit"
          disabled={Loading}
          className="bg-[#00A86B] text-[#f1f1f1]"
        >
          Save changes
        </Button>
      </Box>
    </Box>
  );
};

export default BillingAddressContent;
