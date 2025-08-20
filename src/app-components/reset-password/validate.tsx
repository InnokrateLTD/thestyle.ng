"use client";
import { useState } from "react";
import { Input } from "@/app-components/ui/input";
import { Button } from "@/app-components/ui/button";
import { verifyFormValues, verifySchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useStylengAuthStore } from "@/app-stores/auth";
import { validatePassword } from "@/api-services/auth";
import LoadingDots from "../ui/loadingDots";
import { useModalStore } from "@/app-stores/modal";

const ValidatePasswordCode = () => {
  const { email, setToken } = useStylengAuthStore()
  const { openModal } = useModalStore()
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
      token: data.code,
      email: email
    };
    try {
      const response = await validatePassword(x);
      if (response.status === 200 || response.status === 201) {
        setToken(data.code)
        toast.success("Code Verified");
        openModal("reset")
      } else {
        toast.error(response?.data.msg);
      }
    } catch (error) {
      console.log(error);
      toast.error(`Error: ${error}`);
    } finally {
      setStatus("idle");
    }
  };

  return (
    <div className="w-full">
      <div className="space-y-4 flex flex-col">
        <div>
          <h2 className="text-lg font-bold mb-1 uppercase">Check your email</h2>
          <p className="text-sm text-gray-500 mb-4">
            We&apos;ve sent a password reset code into your email
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="text-xs text-grey-text font-semibold block mb-1 uppercase">
              Code
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
            {status === "loading" ? <LoadingDots /> : "Validate"}
          </Button>
          <p className="text-sm text-gray-500 mb-4">
           Found your password?{" "}
            <span
              onClick={() => openModal("login")}
              className="text-black underline cursor-pointer"
            >
              Login
            </span> {" "} to your account or don&apos;t have an account yet?
            <span onClick={() => openModal("signup")} className="text-black underline cursor-pointer"> Sign up</span> with us.
          </p> 
        </form>
      </div>
    </div>
  );
};

export default ValidatePasswordCode;
