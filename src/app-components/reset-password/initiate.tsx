"use client";
import { useState } from "react";
import { Input } from "@/app-components/ui/input";
import { Button } from "@/app-components/ui/button";
import { InitiateResetSchema, InitiateResetValues } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useStylengAuthStore } from "@/app-stores/auth";
import { initiatePasswordReset } from "@/api-services/auth";
import LoadingDots from "../ui/loadingDots";
import { useModalStore } from "@/app-stores/modal";

const InitiatePasswordReset = () => {
  const { setEmail } = useStylengAuthStore()
  const { openModal } = useModalStore()
  const [status, setStatus] = useState<"idle" | "loading">("idle");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InitiateResetValues>({
    resolver: zodResolver(InitiateResetSchema),
    mode: "onChange",
  });
  const onSubmit = async (data: InitiateResetValues) => {
    setStatus("loading");
    const x = {
      email: data.email
    };
    try {
      const response = await initiatePasswordReset(x);
      if (response.status === 200 || response.status === 201) {
        setEmail(data.email)
        toast.success("Email Sent");
        openModal('validate')
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
          <h2 className="text-lg font-bold mb-1 uppercase">RESET YOUR PASSWORD</h2>
          <p className="text-sm text-gray-500 mb-4">
            Confirm your email address below
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="text-xs text-grey-text font-semibold block mb-1 uppercase">
              Email Address
            </label>
            <Input
              type="email"
              {...register("email")}
              className="border border-grey-lighter rounded-none focus:outline-none w-100 h-11 text-sm"
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>
          <Button className="w-100 h-11 bg-black text-white rounded-none font-medium uppercase">
            {status === "loading" ? <LoadingDots /> : "Reset"}
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

export default InitiatePasswordReset;
