"use client";
import { useState } from "react";
import { Input } from "@/app-components/ui/input";
import { Button } from "@/app-components/ui/button";
import { businessInfoSchema, BusinessInfoValues } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { useStylengAuthStore } from "@/app-stores/auth";
import { businessAccSetup } from "@/api-services/auth";
import LoadingDots from "../ui/loadingDots";
import { useModalStore } from "@/app-stores/modal";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/app-components/ui/select";
import { Textarea } from "../ui/textarea";
const StoreVendorInfo = () => {
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
    <div className="w-full">
      
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
            <label className="text-xs text-grey-text font-semibold block mb-1 uppercase">
              Store name
            </label>
            <Input
              type="text"
              {...register("business_name")}
              className="border border-grey-lighter rounded-none focus:outline-none h-11 text-sm"
            />
            {errors.business_name && (
              <p className="text-xs text-red-500 mt-1">{errors.business_name.message}</p>
            )}
          </div>
            <div>
            <label className="text-xs text-grey-text font-semibold block mb-1 uppercase">
              Business name
            </label>
            <Input
              type="text"
              {...register("business_name")}
              className="border border-grey-lighter rounded-none focus:outline-none  h-11 text-sm"
            />
            {errors.business_name && (
              <p className="text-xs text-red-500 mt-1">{errors.business_name.message}</p>
            )}
          </div>
          </div>
          <div>
                        <label className="text-xs text-grey-text font-semibold block mb-1 uppercase">Store Description</label>
                        <Textarea
                          {...register("business_name")}
                          className="rounded-none"
                          placeholder="Enter product description"
                          rows={10}
                        />
                        {errors.business_name && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors.business_name.message}
                          </p>
                        )}
                      </div>
          <div>
            <label className="text-xs text-grey-text font-semibold block mb-1 uppercase">
              Contact Number
            </label>
            <Input
              type="text"
              {...register("phone_number")}
              className="border border-grey-lighter rounded-none focus:outline-none w-full h-11 text-sm"
            />
            {errors.phone_number && (
              <p className="text-xs text-red-500 mt-1">{errors.phone_number.message}</p>
            )}
          </div>
          <div>
            <label className="text-xs text-grey-text font-semibold block mb-1 uppercase">
             Address
            </label>
            <Input
              type="text"
              {...register("shop_address")}
              className="border border-grey-lighter rounded-none focus:outline-none w-full h-11 text-sm"
            />
            {errors.shop_address && (
              <p className="text-xs text-red-500 mt-1">{errors.shop_address.message}</p>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
            <label className="text-xs text-grey-text font-semibold block mb-1 uppercase">
              Country
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
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
            <label className="text-xs text-grey-text font-semibold block mb-1 uppercase">
              City
            </label>
            <Input
              type="text"
              {...register("business_name")}
              className="border border-grey-lighter rounded-none focus:outline-none h-11 text-sm"
            />
            {errors.business_name && (
              <p className="text-xs text-red-500 mt-1">{errors.business_name.message}</p>
            )}
          </div>
            <div>
            <label className="text-xs text-grey-text font-semibold block mb-1 uppercase">
              Zip Code (optional)
            </label>
            <Input
              type="text"
              {...register("business_name")}
              className="border border-grey-lighter rounded-none focus:outline-none  h-11 text-sm"
            />
            {errors.business_name && (
              <p className="text-xs text-red-500 mt-1">{errors.business_name.message}</p>
            )}
          </div>
          </div>
          <Button className="w-full h-11 bg-black text-white rounded-none font-medium uppercase">
            {status === "loading" ? <LoadingDots /> : "Continue"}
          </Button>
        </form>
      </div>
  );
};

export default StoreVendorInfo;
