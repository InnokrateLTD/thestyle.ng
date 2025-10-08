"use client";
import { useState } from "react";
import {
  EyeIcon,
  EyeOffIcon,
  CircleAlertIcon,
  CircleCheckIcon,
  CircleXIcon,
} from "lucide-react";
import { Input } from "@/app-components/ui/input";
import { Button } from "@/app-components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ResetPasswordFormValues, ResetPasswordSchema } from "@/lib/schema";
import { resetPassword } from "@/api-services/profile";
import toast from "react-hot-toast";
import LoadingDots from "../ui/loadingDots";
const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading">("idle");
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(ResetPasswordSchema),
    mode: "onChange",
  });
  const passwordValue = watch("old_password");
  const newPasswordValue = watch("new_password")

  const onSubmit = async (data: ResetPasswordFormValues) => {
    setStatus("loading");
    const x = {
      old_password: data.old_password,
      new_password: data.new_password,
    };
    try {
      const response = await resetPassword(x);
      if (response.status === 200 || response.status === 201) {
        toast.success("Password Update Successful");
      } else {
        toast.error(response?.data.msg);
      }
    } catch (error) {
      toast.error(`Password Update error: ${error}`);
    } finally {
      setStatus("idle");
    }
  };

  // Password strength checker
  const getStrength = (password: string) => {
    const hasMinLength = password.length >= 8;
    const hasSymbolOrNumber = /[\W_0-9]/.test(password);

    if (hasMinLength && hasSymbolOrNumber) return "Strong";
    return "Weak";
  };

  return (
    <div className="w-full">

      <form className="space-y-4 " onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="text-xs text-grey-text font-semibold  block mb-1">
           OLD PASSWORD
          </label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              className="border border-grey-lighter rounded-none focus:outline-none w-full h-11 text-sm"
              {...register("old_password")}
            />
            <Button
              type="button"
              variant={"ghost"}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-1 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
            </Button>
          </div>
          {/* Strength checks */}

          {errors.old_password && (
            <ul className="text-xs mt-1 space-y-1">
              <li
                className={`${
                  passwordValue
                    ? getStrength(passwordValue) === "Strong"
                      ? "text-green-600"
                      : "text-red-500"
                    : "text-gray-400"
                } flex gap-2`}
              >
                {passwordValue ? (
                  getStrength(passwordValue) === "Strong" ? (
                    <CircleCheckIcon className="w-4 h-4" />
                  ) : (
                    <CircleXIcon className="w-4 h-4" />
                  )
                ) : (
                  <CircleAlertIcon className="w-4 h-4" />
                )}
                Password Strength:{" "}
                {passwordValue ? getStrength(passwordValue) : "Enter password"}
              </li>
              <li
                className={`${
                  passwordValue && passwordValue.length >= 8
                    ? "text-green-600"
                    : "text-yellow-600"
                } flex gap-2`}
              >
                {passwordValue && passwordValue.length >= 8 ? (
                  <CircleCheckIcon className="w-4 h-4" />
                ) : (
                  <CircleAlertIcon className="w-4 h-4" />
                )}{" "}
                Must contain at least 8 characters
              </li>
              <li
                className={`${
                  /[\W_0-9]/.test(passwordValue)
                    ? "text-green-600"
                    : "text-yellow-600"
                } flex gap-2`}
              >
                {/[\W_0-9]/.test(passwordValue) ? (
                  <CircleCheckIcon className="w-4 h-4" />
                ) : (
                  <CircleAlertIcon className="w-4 h-4" />
                )}{" "}
                Must have at least one symbol or number
              </li>
            </ul>
          )}
        </div>

        <div>
          <label className="text-xs text-grey-text font-semibold  block mb-1">
            NEW PASSWORD
          </label>
          <div className="relative">
            <Input
            type={showNewPassword ? "text" : "password"}
              className="border border-grey-lighter rounded-none focus:outline-none w-full h-11 text-sm"
              {...register("new_password")}
            />
            <Button
              type="button"
              variant={"ghost"}
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute inset-y-1 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
            >
              {showNewPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
            </Button>
          </div>
          {errors.new_password && (
            <ul className="text-xs mt-1 space-y-1">
              <li
                className={`${
                  newPasswordValue
                    ? getStrength(newPasswordValue) === "Strong"
                      ? "text-green-600"
                      : "text-red-500"
                    : "text-gray-400"
                } flex gap-2`}
              >
                {newPasswordValue ? (
                  getStrength(newPasswordValue) === "Strong" ? (
                    <CircleCheckIcon className="w-4 h-4" />
                  ) : (
                    <CircleXIcon className="w-4 h-4" />
                  )
                ) : (
                  <CircleAlertIcon className="w-4 h-4" />
                )}
                Password Strength:{" "}
                {newPasswordValue ? getStrength(newPasswordValue) : "Enter password"}
              </li>
              <li
                className={`${
                  newPasswordValue && newPasswordValue.length >= 8
                    ? "text-green-600"
                    : "text-yellow-600"
                } flex gap-2`}
              >
                {newPasswordValue && newPasswordValue.length >= 8 ? (
                  <CircleCheckIcon className="w-4 h-4" />
                ) : (
                  <CircleAlertIcon className="w-4 h-4" />
                )}{" "}
                Must contain at least 8 characters
              </li>
              <li
                className={`${
                  /[\W_0-9]/.test(newPasswordValue)
                    ? "text-green-600"
                    : "text-yellow-600"
                } flex gap-2`}
              >
                {/[\W_0-9]/.test(newPasswordValue) ? (
                  <CircleCheckIcon className="w-4 h-4" />
                ) : (
                  <CircleAlertIcon className="w-4 h-4" />
                )}{" "}
                Must have at least one symbol or number
              </li>
            </ul>
          )}
        </div>
        <Button
          type="submit"
          className="w-full h-11 border bg-black text-white py-2 rounded font-medium uppercase"
        >
          {status === "loading" ? <LoadingDots /> : "update password"}
        </Button>

        
      </form>
    </div>
  );
};

export default ResetPassword;
