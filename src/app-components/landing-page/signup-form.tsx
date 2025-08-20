
"use client"
import { useState, useEffect } from "react";
import { EyeIcon, EyeOffIcon,CircleAlertIcon, CircleCheckIcon, CircleXIcon } from "lucide-react";
import { Input } from "@/app-components/ui/input";
import { Button } from "@/app-components/ui/button";
import Image from "next/image";
import googleIcon from "@/assets/google.svg"
import fbIcon from "@/assets/fb.svg"
import appleIcon from "@/assets/apple.svg"
import Link from "next/link";
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form";
import { SignupBuyerFormValues, signupBuyerSchema } from "@/lib/schema";
import { signupBuyer, getSocialAuthURL, getSocialAuthCallBack } from "@/api-services/auth";
import toast from "react-hot-toast"
import { useStylengAuthStore } from "@/app-stores/auth";
import LoadingDots from "../ui/loadingDots";
import { useModalStore } from "@/app-stores/modal";
import { useSearchParams } from "next/navigation";
import { setCookie } from "cookies-next";
const SignupForm = () => {
  const {openModal } = useModalStore();
  const closeModal = useModalStore((state) => state.closeModal);
  const provider = useStylengAuthStore((state) => state.provider);
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading">("idle");
  const { setEmail, setProvider } = useStylengAuthStore()
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignupBuyerFormValues>({
    resolver: zodResolver(signupBuyerSchema),
    mode: "onChange",
  });
  const passwordValue = watch("password");

  const onSubmit = async(data: SignupBuyerFormValues) => {
    setStatus("loading");
    const x = {
      email: data.email,
      first_name: data.firstName,
      last_name: data.lastName,
      password: data.password,
      confirm_password: data.confirmPassword,
      is_buyer:  1
    };
    try {
      const response = await signupBuyer(x);
      if (response.status === 200 || response.status === 201) {
        setEmail(response?.data.data.email);
        toast.success("Registration Successful");
        openModal("verify")
      } else {
        toast.error(response?.data.msg);
      }
    } catch (error) {
      toast.error(`Registration error: ${error}`);
    } finally {
      setStatus("idle");
    }
  };

  const getSocialAuthLink = async(provider: string) => {
    const x = {
      provider: provider,
      redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI
    }
    try {
      const response = await getSocialAuthURL(x);
      if (response.status === 200 || response.status === 201) {
        const authURL = response.data.data.authorization_url
          window.location.replace(
            authURL 
          );
      } else {
        toast.error(response?.data.msg);
      }
    } catch (error) {
      toast.error(`Registration error: ${error}`);
    } finally {
      setStatus("idle");
    }
  }

  const getAuthCallback = async(code: string) => {
    setProvider(provider)
    const x = {
      provider: provider,
      code: code,
      redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI
    }
    try {
      const response = await getSocialAuthCallBack(x);
      if (response.status === 200 || response.status === 201) {
                setCookie('SNG_A', response?.data.data.token.access_token, {
                  maxAge: 60 * 60 * 24,
                  path: '/',
        });
        closeModal()
        toast.success(response.data.msg)
      } else {
        toast.error(response?.data.msg);
      }
    } catch (error) {
      toast.error(`Registration error: ${error}`);
    } finally {
      setStatus("idle");
    }
  }
  
  // Password strength checker
  const getStrength = (password: string) => {
  const hasMinLength = password.length >= 8;
  const hasSymbolOrNumber = /[\W_0-9]/.test(password);

  if (hasMinLength && hasSymbolOrNumber) return "Strong";
  return "Weak";
};

useEffect(() => {
    const code = searchParams.get("code");

    if (code) {
      getAuthCallback(code)
    }
    // eslint-disable-next-line
  }, [searchParams]);
  return (
    <div className="w-full flex flex-col">
      <div className="">
        <h2 className="text-lg font-bold mb-1">SIGN UP</h2>
        <p className="text-sm text-gray-500 mb-4">
          Already have an account? <Link href="/" onClick={() => openModal('login')} className="text-black underline">Log in</Link>
        </p>
      </div>

      <form className="space-y-4 " onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="text-xs text-grey-text font-semibold  block mb-1">FIRST NAME</label>
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
            <label className="text-xs text-grey-text font-semibold  block mb-1">LAST NAME</label>
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
          <label className="text-xs text-grey-text font-semibold  block mb-1">EMAIL ADDRESS</label>
          <Input
            type="email"
            placeholder="you@email.com"
            className="border border-grey-lighter rounded-none focus:outline-none w-full h-11 text-sm"
            {...register("email")}
          />
          {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
        </div>

        <div>
          <label className="text-xs text-grey-text font-semibold  block mb-1">PASSWORD</label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              className="border border-grey-lighter rounded-none focus:outline-none w-full h-11 text-sm"
              {...register('password')}
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

         {errors.password && ( <ul className="text-xs mt-1 space-y-1">
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
              passwordValue &&  passwordValue.length >= 8 ? "text-green-600" : "text-yellow-600"
              } flex gap-2`}
            >
              {passwordValue && passwordValue.length >= 8 ? <CircleCheckIcon className="w-4 h-4"/> : <CircleAlertIcon className="w-4 h-4"/>} Must contain at least 8 characters
            </li>
            <li
              className={`${
                /[\W_0-9]/.test(passwordValue)
                  ? "text-green-600" : "text-yellow-600"
              } flex gap-2`}
            >
             { /[\W_0-9]/.test(passwordValue) ? <CircleCheckIcon className="w-4 h-4"/> : <CircleAlertIcon className="w-4 h-4"/>} Must have at least one symbol or number
            </li>
          </ul>)}
          {/* {errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {errors.password.message}
              </p>
            )} */}
        </div>

        <div>
          <label className="text-xs text-grey-text font-semibold  block mb-1">CONFIRM PASSWORD</label>
          <div className="relative">
            <Input
              type="password"
              className="border border-grey-lighter rounded-none focus:outline-none w-full h-11 text-sm"
              {...register('confirmPassword')}
            />
          </div>
          {errors.confirmPassword && (
              <p className="text-xs text-red-500 mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
        </div>
        <Button type="submit" className="w-full h-11 border bg-black text-white py-2 rounded font-medium">{status === "loading" ? <LoadingDots /> : "SIGN UP"}</Button>

        <div className="space-y-2 pt-3">
          <Button type="button" onClick={() => getSocialAuthLink('google')} variant="ghost" className="w-full h-11 border bg-white text-black flex items-center justify-center gap-2 text-sm">
            <Image src={googleIcon} alt="Google" className="w-4 h-4" />
            Continue with Google
          </Button>
          {/* <Button type="button" onClick={() => getSocialAuthLink('facebook')}  variant="ghost" className="w-full h-11 border bg-white text-black flex items-center justify-center gap-2 text-sm">
            <Image src={fbIcon} alt="Facebook" className="w-4 h-4" />
            Continue with Facebook
          </Button>
          <Button type="button" onClick={() => getSocialAuthLink('apple')} variant="ghost" className="w-full h-11 border bg-white text-black flex items-center justify-center gap-2 text-sm">
            <Image src={appleIcon} alt="Apple" className="w-4 h-4" />
            Continue with Apple
          </Button> */}
        </div>

        <p className="text-[11px] text-gray-500 text-center pt-2">
          By creating an account, you agree to our Terms of Service and Privacy Policy.
        </p>
      </form>
    </div>
  );
};

export default SignupForm;
