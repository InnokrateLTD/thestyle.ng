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
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CreatePasswordValues, createPasswordSchema } from "@/lib/schema";
import { createPassword } from "@/api-services/auth";
import toast from "react-hot-toast";
import { useStylengAuthStore } from "@/app-stores/auth";
import LoadingDots from "../ui/loadingDots";
import { useModalStore } from "@/app-stores/modal";
const CreatePassword = () => {
  const { openModal } = useModalStore();
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading">("idle");
  const { email } = useStylengAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<CreatePasswordValues>({
    resolver: zodResolver(createPasswordSchema),
    mode: "onChange",
  });
  const passwordValue = watch("password");

  const onSubmit = async (data: CreatePasswordValues) => {
    setStatus("loading");
    const x = {
      email: email,
      password: data.password,
      confirm_password: data.confirmPassword,
    };
    try {
      const response = await createPassword(x);
      if (response.status === 200 || response.status === 201) {
        toast.success("Password Creation Successful");
        openModal("business-setup");
      } else {
        toast.error(response?.data.msg);
      }
    } catch (error) {
      toast.error(`Password Creation error: ${error}`);
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
    <div className="w-full flex flex-col">
      <div className="">
        <h2 className="text-lg font-bold mb-1 uppercase">
          Create your password
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Keep your account secure with a strong password{" "}
          <Link
            href="/"
            onClick={() => openModal("login")}
            className="text-black underline"
          >
            Log in
          </Link>
        </p>
      </div>

      <form className="space-y-4 " onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="text-xs text-grey-text font-semibold  block mb-1">
            PASSWORD
          </label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              className="border border-grey-lighter rounded-none focus:outline-none w-full h-11 text-sm"
              {...register("password")}
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

          {errors.password && (
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
            CONFIRM PASSWORD
          </label>
          <div className="relative">
            <Input
              type="password"
              className="border border-grey-lighter rounded-none focus:outline-none w-full h-11 text-sm"
              {...register("confirmPassword")}
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-xs text-red-500 mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <Button
          type="submit"
          className="w-full h-11 border bg-black text-white py-2 rounded font-medium uppercase"
        >
          {status === "loading" ? <LoadingDots /> : "Continue"}
        </Button>

        <p className="text-[11px] text-gray-500 text-center pt-2">
          By creating an account, you agree to our Terms of Service and Privacy
          Policy.
        </p>
      </form>
    </div>
  );
};

export default CreatePassword;
