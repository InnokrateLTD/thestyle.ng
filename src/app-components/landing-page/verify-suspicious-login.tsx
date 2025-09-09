"use client";
import { useState } from "react";
import { Input } from "@/app-components/ui/input";
import { Button } from "@/app-components/ui/button";
import { verifySchema, verifyFormValues } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useStylengAuthStore } from "@/app-stores/auth";
import { loginBuyer } from "@/api-services/auth";
import { setCookie } from "cookies-next";
import LoadingDots from "../ui/loadingDots";
import { useModalStore } from "@/app-stores/modal";

const VerifySuspiciousForm = () => {
  const closeModal = useModalStore((state) => state.closeModal);
  const { email, password } = useStylengAuthStore();
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
      email: email,
      password: password,
      otp_code: data.code
    };
    try {
      const response = await loginBuyer(x);
      if (response.status === 200 || response.status === 201) {
        setCookie("SNG_A", response?.data.data.token.access_token, {
          maxAge: 60 * 60 * 24,
          path: "/",
        });
        toast.success("Login Successful");
        closeModal();
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
    <div className="w-full flex flex-col items-center justify-center">
      <div className="space-y-4 flex flex-col justify-center items-center">
        <div>
          <h2 className="text-lg font-bold mb-1">VERIFY YOUR LOGIN</h2>
          <p className="text-sm text-gray-500 mb-4">
            We noticed a suspicious login and we&apos;ve sent a verification code to {email}. Enter it below.
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

export default VerifySuspiciousForm;
