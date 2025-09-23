"use client";
import { useEffect, useState } from "react";
import { Input } from "@/app-components/ui/input";
import { Button } from "@/app-components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ProfileFormValues, ProfileSchema } from "@/lib/schema";
import toast from "react-hot-toast";
import LoadingDots from "../ui/loadingDots";
import { useGetProfile, updateUserProfile } from "@/api-services/profile";
const ProfileDetails = () => {
  const [status, setStatus] = useState<"idle" | "loading">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(ProfileSchema),
    mode: "onChange",
  });
  const {result: profile} = useGetProfile()
  const onSubmit = async (data: ProfileFormValues) => {
    setStatus("loading");
    const x = {
      // email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
      phone_number: data.phone_number
    };
    try {
      const response = await updateUserProfile(x);
      if (response.status === 200 || response.status === 201) {
        toast.success("Update Successful");
      } else {
        toast.error(response?.data.msg);
      }
    } catch (error) {
      toast.error(`Update error: ${error}`);
    } finally {
      setStatus("idle");
    }
  };
  useEffect(() => {
    if (profile){
      reset({
        first_name: profile?.first_name,
        last_name: profile?.last_name,
        email: profile?.email,
        phone_number: profile?.phone_number ?? ''
      })
    }
  }, [profile, reset])
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
              {...register("first_name")}
            />
            {errors.first_name && (
              <p className="text-xs text-red-500 mt-1">
                {errors.first_name.message}
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
              {...register("last_name")}
            />
            {errors.last_name && (
              <p className="text-xs text-red-500 mt-1">
                {errors.last_name.message}
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
            readOnly
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
            {...register("phone_number")}
          />
          {errors.phone_number && (
            <p className="text-xs text-red-500 mt-1">{errors.phone_number.message}</p>
          )}
        </div>
        <Button
          type="submit"
          className="w-full h-11 border bg-black text-white py-2 rounded font-medium uppercase"
        >
          {status === "loading" ? <LoadingDots /> : "Update Details"}
        </Button>
      </form>
    </div>
  );
};

export default ProfileDetails;
