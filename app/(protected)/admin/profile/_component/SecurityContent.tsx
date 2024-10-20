"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Eye, EyeOff } from "lucide-react";
import { poppins } from "@/lib/constants";
import { toast } from "sonner";
import { useAdminChangePasswordMutation } from "@/store/api/Admin/adminProfile";

// Zod schema for form validation
const formSchema = z
  .object({
    currentPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    newPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const SecurityContent = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [AdminChangePassword] = useAdminChangePasswordMutation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const response = await AdminChangePassword({
        ...values,
      }).unwrap();
      if (response) {
        toast.success(response.message);
        setLoading(false);
        reset({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        toast.error(`Couldn't Change Password`);
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
      className={`${poppins.className} bg-white p-4 sm:p-6 rounded-lg sm:rounded-[12px]`}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-base sm:text-lg text-[#28353D] font-medium mb-4">
        Change Password
      </h2>

      {/* Current Password Field */}
      <Controller
        name="currentPassword"
        control={control}
        render={({ field }) => (
          <Box mb={2}>
            <TextField
              {...field}
              type={showCurrentPassword ? "text" : "password"}
              label="Current Password"
              variant="outlined"
              fullWidth
              error={!!errors.currentPassword}
              helperText={errors.currentPassword?.message}
              InputProps={{
                endAdornment: (
                  <Box
                    component="span"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    sx={{ cursor: "pointer" }}
                  >
                    {showCurrentPassword ? <EyeOff /> : <Eye />}
                  </Box>
                ),
              }}
            />
          </Box>
        )}
      />

      {/* New Password Field */}
      <Controller
        name="newPassword"
        control={control}
        render={({ field }) => (
          <Box mb={2}>
            <TextField
              {...field}
              type={showNewPassword ? "text" : "password"}
              label="New Password"
              variant="outlined"
              fullWidth
              error={!!errors.newPassword}
              helperText={errors.newPassword?.message}
              InputProps={{
                endAdornment: (
                  <Box
                    component="span"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    sx={{ cursor: "pointer" }}
                  >
                    {showNewPassword ? <EyeOff /> : <Eye />}
                  </Box>
                ),
              }}
            />
          </Box>
        )}
      />

      {/* Confirm Password Field */}
      <Controller
        name="confirmPassword"
        control={control}
        render={({ field }) => (
          <Box mb={2}>
            <TextField
              {...field}
              type={showConfirmPassword ? "text" : "password"}
              label="Confirm Password"
              variant="outlined"
              fullWidth
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              InputProps={{
                endAdornment: (
                  <Box
                    component="span"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    sx={{ cursor: "pointer" }}
                  >
                    {showConfirmPassword ? <EyeOff /> : <Eye />}
                  </Box>
                ),
              }}
            />
          </Box>
        )}
      />

      {/* Password Requirements */}
      <Box mb={4}>
        <p className="font-medium text-sm sm:text-base my-4">
          Password Requirements:
        </p>
        <ul className="list-disc list-inside space-y-2 sm:space-y-4 text-[#8A92A6] text-sm sm:text-base pl-4">
          <li>Minimum 8 characters long - the more, the better</li>
          <li>At least one lowercase & one uppercase character</li>
          <li>At least one number, symbol, or white space character</li>
        </ul>
      </Box>

      {/* Submit Button */}
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant={"default"}
          disabled={Loading}
          type="submit"
          className="w-full sm:w-auto bg-[#28A745] text-[#f1f1f1] px-6 py-3 rounded-lg text-base"
        >
          Save changes
        </Button>
      </Box>
    </Box>
  );
};

export default SecurityContent;
