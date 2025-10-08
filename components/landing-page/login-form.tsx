"use client";
import { useState, useEffect, Suspense } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import googleIcon from "@/assets/google.svg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginBuyerSchema, LoginBuyerFormValues } from "@/lib/schema";
import {
  loginBuyer,
  getSocialAuthURL,
  getSocialAuthCallBack,
} from "@/api-services/auth";
import toast from "react-hot-toast";
import LoadingDots from "../ui/loadingDots";
import { setCookie } from "cookies-next";
import { useModalStore } from "@/stores/modal";
import { useStylengAuthStore } from "@/stores/auth";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
const LoginFormPage = () => {
  const { openModal } = useModalStore();
  const router = useRouter();
  const { setProvider, setEmail, setPassword, setStylengUser, setIsLoggedIn } =
    useStylengAuthStore();
  const searchParams = useSearchParams();
  const provider = useStylengAuthStore((state) => state.provider);
  const closeModal = useModalStore((state) => state.closeModal);
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading">("idle");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginBuyerFormValues>({
    resolver: zodResolver(loginBuyerSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: LoginBuyerFormValues) => {
    setStatus("loading");
    const x = {
      email: data.email,
      password: data.password,
      // is_buyer: 1,
    };
    try {
      const response = await loginBuyer(x);
      if (response.status === 200 || response.status === 201) {
        setCookie("SNG_A", response?.data.data.token.access_token, {
          maxAge: 60 * 60 * 24,
          path: "/",
        });
        setCookie("ref", response.data.data.token.refresh_token, {
          maxAge: 60 * 60 * 24,
          path: "/",
        });
        setStylengUser(response.data.data.user);
        setIsLoggedIn(true);
        const loginRedirectedFromUrl = localStorage.getItem(
          "loginRedirectedFromUrl"
        );
        localStorage.removeItem("loginRedirectedFromUrl");
        if (response.data.data.user.role.toLowerCase() === "seller") {
  router.push("/vendors-app");
} else if (response.data.data.user.role.toLowerCase() === "buyer") {
  router.push("/");
} else if (loginRedirectedFromUrl) {
  router.push(loginRedirectedFromUrl);
}
toast.success("Login Successful");
        closeModal();
      } else {
        toast.error(response?.data.msg);
        console.log(
          response?.data.msg.toLowerCase().includes("Suspicious login detected")
        );
        if (
          response?.data.msg.toLowerCase().includes("suspicious login detected")
        ) {
          setEmail(data.email);
          setPassword(data.password);
          openModal("verify-suspicious-login");
        }
      }
    } catch (error) {
      toast.error(`Registration error: ${error}`);
    } finally {
      setStatus("idle");
    }
  };
  const getSocialAuthLink = async (provider: string) => {
    const x = {
      provider: provider,
      redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI,
    };
    try {
      const response = await getSocialAuthURL(x);
      if (response.status === 200 || response.status === 201) {
        const authURL = response.data.data.authorization_url;
        window.location.replace(authURL);
      } else {
        toast.error(response?.data.msg);
      }
    } catch (error) {
      toast.error(`Registration error: ${error}`);
    } finally {
      setStatus("idle");
    }
  };

  const getAuthCallback = async (code: string) => {
    setProvider(provider);
    const x = {
      provider: provider,
      code: code,
      redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI,
    };
    try {
      const response = await getSocialAuthCallBack(x);
      if (response.status === 200 || response.status === 201) {
        setCookie("SNG_A", response?.data.data.token.access_token, {
          maxAge: 60 * 60 * 24,
          path: "/",
        });
        setCookie("ref", response.data.data.token.refresh_token);
        setIsLoggedIn(true);
        setStylengUser(response.data.data.user);
        const loginRedirectedFromUrl = localStorage.getItem(
          "loginRedirectedFromUrl"
        );
        localStorage.removeItem("loginRedirectedFromUrl");
        if (loginRedirectedFromUrl) {
          router.push(loginRedirectedFromUrl);
        } else {
          router.push("/");
        }
        closeModal();
        toast.success(response.data.msg);
      } else {
        toast.error(response?.data.msg);
      }
    } catch (error) {
      toast.error(`Registration error: ${error}`);
    } finally {
      setStatus("idle");
    }
  };

  useEffect(() => {
    const code = searchParams.get("code");

    if (code) {
      getAuthCallback(code);
    }
    // eslint-disable-next-line
  }, [searchParams]);
  return (
    <div className="w-full">
      <div className="space-y-4 flex flex-col justify-center items-center">
        <div>
          <h2 className="text-lg font-bold mb-1">LOG IN</h2>
          <p className="text-sm text-gray-500 mb-4">
            Don’t have an account?{" "}
            <span
              onClick={() => openModal("signup")}
              className="text-black underline cursor-pointer"
            >
              Sign up as a buyer
            </span>{" "}
            or{" "}
            <span
              onClick={() => openModal("signup-vendor")}
              className="text-black underline cursor-pointer"
            >
              Sign up as a vendor
            </span>
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-xs text-grey-text font-semibold block mb-1">
              EMAIL ADDRESS
            </label>
            <Input
              type="email"
              placeholder="you@email.com"
              {...register("email")}
              className="border border-grey-lighter rounded-none focus:outline-none w-100 h-11 text-sm"
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-xs text-grey-text font-semibold  block mb-1">
              PASSWORD
            </label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                className="border border-grey-lighter rounded-none focus:outline-none w-full h-11 text-sm"
                {...register("password")}
              />
              <Button
                type="button"
                variant={"ghost"}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-1 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeOffIcon size={18} />
                ) : (
                  <EyeIcon size={18} />
                )}
              </Button>
            </div>

            {errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <p className="text-sm text-gray-500">
            Forgot password?{" "}
            <span
              onClick={() => openModal("initiate")}
              className="text-black underline cursor-pointer"
            >
              Click here
            </span>
          </p>

          <Button className="w-100 h-11 bg-black text-white rounded-none font-medium uppercase">
            {status === "loading" ? <LoadingDots /> : "Log in"}
          </Button>
        </form>
        <div className="space-y-2 pt-3">
          <Button
            onClick={() => getSocialAuthLink("google")}
            className="w-100 h-11 border bg-white text-black hover:bg-transparent rounded-none flex items-center justify-center gap-2 text-sm"
          >
            <Image src={googleIcon} alt="Google" className="w-4 h-4" />
            Continue with Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function LoginForm() {
  return (
    <Suspense fallback={<div className="p-4 text-gray-500">Loading Orders...</div>}>
      <LoginFormPage />
    </Suspense>
  );
}
