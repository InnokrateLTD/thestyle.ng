
// import { EyeIcon } from "lucide-react";
import { Input } from "@/app-components/ui/input";
import { Button } from "@/app-components/ui/button";
import Image from "next/image";
import googleIcon from "@/assets/google.svg"
import fbIcon from "@/assets/fb.svg"
import appleIcon from "@/assets/apple.svg"
const LoginForm = () => {
  return (
    <div className="w-full">
      

      <div className="space-y-4 flex flex-col justify-center items-center">
        <div>
            <h2 className="text-lg font-bold mb-1">LOG IN</h2>
      <p className="text-sm text-gray-500 mb-4">
        Don’t have an account?{" "}
        <a href="#" className="text-black underline">Sign up as a buyer</a> or{" "}
        <a href="#" className="text-black underline">Sign up as a vendor</a>
      </p>
        </div>
        <div>
          <label className="text-xs text-grey-text font-semibold block mb-1">EMAIL ADDRESS</label>
          <Input
            type="email"
            placeholder="you@email.com"
            className="border border-grey-lighter rounded-none focus:outline-none w-100 h-11 text-sm"
          />
        </div>

        <div>
          <label className="text-xs text-grey-text font-semibold  block mb-1">PASSWORD</label>
          <div className="relative">
            <Input
              type="password"
              className="border border-grey-lighter rounded-none focus:outline-none w-100 h-11 text-sm"
            />
            {/* <EyeIcon className="absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400"/> */}
            
          </div>
        </div>

        <p className="text-sm text-gray-500">
          Forgot password? <a href="#" className="text-black underline">Click here</a>
        </p>

        <Button className="w-100 h-11 bg-black text-white rounded-none font-medium">LOG IN</Button>

        <div className="space-y-2 pt-3">
          <Button className="w-100 h-11 border bg-white text-black hover:bg-transparent rounded-none flex items-center justify-center gap-2 text-sm">
            <Image src={googleIcon} alt="Google" className="w-4 h-4" />
            Continue with Google
          </Button>
          <Button className="w-100 h-11 border bg-white text-black hover:bg-transparent rounded-none flex items-center justify-center gap-2 text-sm">
            <Image src={fbIcon} alt="Facebook" className="w-4 h-4" />
            Continue with Facebook
          </Button>
          <Button className="w-100 h-11 border bg-white text-black hover:bg-transparent rounded-none flex items-center justify-center gap-2 text-sm">
            <Image src={appleIcon} alt="Apple" className="w-4 h-4" />
            Continue with Apple
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
