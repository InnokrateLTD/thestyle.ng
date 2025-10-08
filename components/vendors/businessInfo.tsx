"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { businessInfoSchema, BusinessInfoValues } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { useStylengAuthStore } from "@/stores/auth";
import { businessAccSetup } from "@/api-services/auth";
import LoadingDots from "../ui/loadingDots";
import { useModalStore } from "@/stores/modal";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const BusinessInfo = () => {
  const { email } = useStylengAuthStore();
  const closeModal = useModalStore((state) => state.closeModal);
  const [status, setStatus] = useState<"idle" | "loading">("idle");
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BusinessInfoValues>({
    resolver: zodResolver(businessInfoSchema),
    mode: "onChange",
  });
  const onSubmit = async (data: BusinessInfoValues) => {
    setStatus("loading");
    const x = {
      email: email ?? "",
      state: data.state,
      shop_address: data.shop_address,
      business_name: data.business_name,
      phone_number: data.phone_number
    };
    try {
      const response = await businessAccSetup(x);
      if (response.status === 200 || response.status === 201) {
        toast.success("Account Setup Successful");
        closeModal();
      } else {
        toast.error(response?.data.msg);
      }
    } catch (error) {
      console.log(error);
      toast.error(`Account Setup error: ${error}`);
    } finally {
      setStatus("idle");
    }
  };
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="space-y-4 flex flex-col justify-center items-center">
        <div>
          <h2 className="text-lg font-bold mb-1 uppercase">Set up your account</h2>
          <p className="text-sm text-gray-500 mb-4">
           Fill in your business details to get started
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="text-xs text-grey-text font-semibold block mb-1 uppercase">
              Business name
            </label>
            <Input
              type="text"
              {...register("business_name")}
              className="border border-grey-lighter rounded-none focus:outline-none w-100 h-11 text-sm"
            />
            {errors.business_name && (
              <p className="text-xs text-red-500 mt-1">{errors.business_name.message}</p>
            )}
          </div>
          <div>
            <label className="text-xs text-grey-text font-semibold block mb-1 uppercase">
              Phone Number
            </label>
            <Input
              type="text"
              {...register("phone_number")}
              className="border border-grey-lighter rounded-none focus:outline-none w-100 h-11 text-sm"
            />
            {errors.phone_number && (
              <p className="text-xs text-red-500 mt-1">{errors.phone_number.message}</p>
            )}
          </div>
          <div>
            <label className="text-xs text-grey-text font-semibold block mb-1 uppercase">
              Shop Address
            </label>
            <Input
              type="text"
              {...register("shop_address")}
              className="border border-grey-lighter rounded-none focus:outline-none w-100 h-11 text-sm"
            />
            {errors.shop_address && (
              <p className="text-xs text-red-500 mt-1">{errors.shop_address.message}</p>
            )}
          </div>
          <div>
            <label className="text-xs text-grey-text font-semibold block mb-1 uppercase">
              State
            </label>
            <Controller
          name="state"
          control={control}
          rules={{ required: "State is required" }}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-full rounded-none">
                <SelectValue placeholder="Please select a state" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lagos">Lagos</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.state && (
          <p className="text-xs text-red-500 mt-1">{errors.state.message}</p>
        )}
          </div>
          <Button className="w-100 h-11 bg-black text-white rounded-none font-medium uppercase">
            {status === "loading" ? <LoadingDots /> : "Continue"}
          </Button>
          <p className="text-[11px] text-gray-500 text-center pt-2">
            By creating an account, you agree to our Terms of Service and
            Privacy Policy.
          </p>
        </form>
      </div>
    </div>
  );
};

export default BusinessInfo;
