"use client";
import { useState } from "react";
import { Input } from "@/app-components/ui/input";
import { Button } from "@/app-components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SignupVendorFormValues, signupVendorSchema } from "@/lib/schema";
import {
  signupVendor
} from "@/api-services/auth";
import toast from "react-hot-toast";
import { useStylengAuthStore } from "@/app-stores/auth";
import LoadingDots from "../ui/loadingDots";
const ProfileDetails = () => {
  const [status, setStatus] = useState<"idle" | "loading">("idle");
  const { setEmail} = useStylengAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupVendorFormValues>({
    resolver: zodResolver(signupVendorSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: SignupVendorFormValues) => {
    setStatus("loading");
    const x = {
      email: data.email,
      first_name: data.firstName,
      last_name: data.lastName,
    };
    try {
      const response = await signupVendor(x);
      if (response.status === 200 || response.status === 201) {
        setEmail(response?.data.data.email);
        toast.success("Registration Successful");
      } else {
        toast.error(response?.data.msg);
      }
    } catch (error) {
      toast.error(`Registration error: ${error}`);
    } finally {
      setStatus("idle");
    }
  };

 
  return (
    <div className="w-full ">
      <form className="space-y-4 " onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="text-xs text-grey-text font-semibold  block mb-1">
              FIRST NAME
            </label>
            <Input
              type="text"
              placeholder="Enter your first name"
              className="border border-grey-lighter h-11 rounded-none text-sm"
              {...register("firstName")}
            />
            {errors.firstName && (
              <p className="text-xs text-red-500 mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div className="flex-1">
            <label className="text-xs text-grey-text font-semibold  block mb-1">
              LAST NAME
            </label>
            <Input
              type="text"
              placeholder="Enter your last name"
              className="border border-grey-lighter h-11 rounded-none text-sm"
              {...register("lastName")}
            />
            {errors.lastName && (
              <p className="text-xs text-red-500 mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="text-xs text-grey-text font-semibold  block mb-1">
            EMAIL ADDRESS
          </label>
          <Input
            type="email"
            placeholder="you@email.com"
            className="border border-grey-lighter rounded-none focus:outline-none w-full h-11 text-sm"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>
<div>
          <label className="text-xs text-grey-text font-semibold  block mb-1 uppercase">
            Phone number
          </label>
          <Input
            type="text"
            placeholder="Enter your phone number"
            className="border border-grey-lighter rounded-none focus:outline-none w-full h-11 text-sm"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>
        <Button
          type="submit"
          className="w-full h-11 border bg-black text-white py-2 rounded font-medium upppercase"
        >
          {status === "loading" ? <LoadingDots /> : "Update Details"}
        </Button>
      </form>
    </div>
  );
};

export default ProfileDetails;
