"use client";
import { useState } from "react";
import { Input } from "@/app-components/ui/input";
import { Button } from "@/app-components/ui/button";
import { verifySchema, verifyFormValues } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useStylengAuthStore } from "@/app-stores/auth";
import { verifyUser, resendVerificationCode } from "@/api-services/auth";
import LoadingDots from "../ui/loadingDots";
import { useModalStore } from "@/app-stores/modal";

const VerifyForm = () => {
  const closeModal = useModalStore((state) => state.closeModal);
  const { email } = useStylengAuthStore();
  const [status, setStatus] = useState<"idle" | "loading">("idle");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<verifyFormValues>({
    resolver: zodResolver(verifySchema),
    mode: "onChange",
  });
  const onSubmit = async (data: verifyFormValues) => {
    setStatus("loading");
    const x = {
      email: email ?? "",
      code: data.code,
    };
    try {
      const response = await verifyUser(x);
      if (response.status === 200 || response.status === 201) {
        toast.success("Verification Successful");
        closeModal()
      } else {
        toast.error(response?.data.msg);
      }
    } catch (error) {
      console.log(error);
      toast.error(`Verification error: ${error}`);
    } finally {
      setStatus("idle");
    }
  };

  const resendverificationCode = async () => {
    setStatus("loading");
    const x = {
      email: email ?? "",
      // code: data.code,
    };
    try {
      const response = await resendVerificationCode(x);
      if (response.status === 200 || response.status === 201) {
        toast.success("Verification Code Resent");
        // router.push("/");
      } else {
        toast.error(response?.data.msg);
      }
    } catch (error) {
      console.log(error);
      toast.error(`Verification error: ${error}`);
    } finally {
      setStatus("idle");
    }
  };
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="space-y-4 flex flex-col justify-center items-center">
        <div>
          <h2 className="text-lg font-bold mb-1">VERIFY YOUR EMAIL</h2>
          <p className="text-sm text-gray-500 mb-4">
            We&apos;ve sent a verification code to {email}. Enter it below.
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="text-xs text-grey-text font-semibold block mb-1">
              VERIFICATION CODE
            </label>
            <Input
              type="text"
              {...register("code")}
              className="border border-grey-lighter rounded-none focus:outline-none w-100 h-11 text-sm"
            />
            {errors.code && (
              <p className="text-xs text-red-500 mt-1">{errors.code.message}</p>
            )}
          </div>
          <p className="text-sm text-gray-500">
            Has your code expired? Don&apos;t see the email? Check your spam or{" "}
            <span className="underline cursor-pointer" onClick={resendverificationCode}>request a new verification code.</span>
          </p>
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

export default VerifyForm;
