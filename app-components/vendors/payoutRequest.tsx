"use client";
import { useState } from "react";
import { Input } from "@/app-components/ui/input";
import { Button } from "@/app-components/ui/button";
import { PayoutSchema, PayoutFormValue } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useStylengAuthStore } from "@/app-stores/auth";
import LoadingDots from "../ui/loadingDots";
import { useModalStore } from "@/app-stores/modal";
import { useGetBankingDetails, requestPayouts, useGetWalletBalance } from "@/api-services/store";
import { Wallet } from "lucide-react";
const PayoutRequest = () => {
  const { email } = useStylengAuthStore();
  const { closeModal } = useModalStore();
  const { result: details } = useGetBankingDetails();
  const { result: balance } = useGetWalletBalance();
  const [status, setStatus] = useState<"idle" | "loading">("idle");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PayoutFormValue>({
    resolver: zodResolver(PayoutSchema),
    mode: "onChange",
  });
  const amount = watch("amount");
  const onSubmit = async (data: PayoutFormValue) => {
    
    if (Number(data.amount) > Number(balance?.payable_balance || 0)) {
  toast.error("Insufficient Balance");
  return;
}
setStatus("loading");
    const x = {
      amount: data.amount
    };
    try {
      const response = await requestPayouts(x);
      if (response.status === 200 || response.status === 201) {
        toast.success("Payout Request Successful");
        closeModal()
      } else {
        toast.error(response?.data.msg);
      }
    } catch (error) {
      console.log(error);
      toast.error(`Request error: ${error}`);
    } finally {
      setStatus("idle");
      closeModal()
    }
  };


  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="space-y-4 flex flex-col justify-center items-center">
        <div>
          <h2 className="text-lg font-bold mb-1 uppercase">Request Payout</h2>
          <p className="text-sm text-gray-500 mb-4">
           Requesting an early payout will incur a service fee of 2.5% of the requested payout amount.
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-gray-100 p-3 rounded-md text-sm text-gray-700">
            Available payout  ₦{balance?.payable_balance} 
        </div>
        <div>
            <label className="text-xs text-grey-text font-semibold block mb-1 uppercase">
              Payout Amount (₦)
            </label>
            <Input
              type="text"
              {...register("amount")}
              className="border border-grey-lighter rounded-none focus:outline-none w-100 h-11 text-sm"
            />
            {errors.amount && (
              <p className="text-xs text-red-500 mt-1">{errors.amount.message}</p>
            )}
          </div>
          <div className="space-y-4 text-sm">
              <div className="">
                <p className="font-semibold text-gray-700 uppercase">Bank Details</p>
                <p className="text-sm">{details?.account_name}</p>
                <p className="text-sm">{details?.account_number}</p>
              </div>
            </div>
          <Button className="w-100 h-11 bg-black text-white rounded-none font-medium uppercase">
            {status === "loading" ? <LoadingDots /> : "Send Request"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PayoutRequest;
