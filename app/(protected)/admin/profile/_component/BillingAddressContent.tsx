import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { poppins } from "@/app/lib/constants";

// Validation schema using Zod
const validationSchema = z.object({
  companyName: z.string().min(1, "Company Name is required"),
  billingEmail: z
    .string()
    .email("Invalid email format")
    .min(1, "Billing Email is required"),
  billingPhone: z.string().min(1, "Billing Phone Number is required"),
  taxId: z.string().min(1, "Tax ID is required"),
  vatNumber: z.string().min(1, "VAT Number is required"),
  billingAddress: z.string().min(1, "Billing Address is required"),
});

const BillingAddressContent: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      companyName: "Naxal Futsal Pvt. Ltd",
      billingEmail: "naxalfutsal@gmail.com",
      billingPhone: "+ 977 9812345678",
      taxId: "342624",
      vatNumber: "16161494",
      billingAddress: "Naxal, Hadigau, Kathmandu",
    },
  });

  const onSubmit = (data: any) => {
    console.log("Form Submitted with values:", data);
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
        Billing Address
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
            label="Billing Phone Number"
            variant="outlined"
            fullWidth
            error={!!errors.billingPhone}
            helperText={errors.billingPhone?.message}
          />
        )}
      />

      {/* Tax ID */}
      <Controller
        name="taxId"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            id="tax-id"
            label="Tax ID"
            variant="outlined"
            fullWidth
            error={!!errors.taxId}
            helperText={errors.taxId?.message}
          />
        )}
      />

      {/* VAT Number */}
      <Controller
        name="vatNumber"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            id="vat-number"
            label="VAT Number"
            variant="outlined"
            fullWidth
            error={!!errors.vatNumber}
            helperText={errors.vatNumber?.message}
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
          className="bg-[#00A86B] text-white"
        >
          Save changes
        </Button>
      </Box>
    </Box>
  );
};

export default BillingAddressContent;
