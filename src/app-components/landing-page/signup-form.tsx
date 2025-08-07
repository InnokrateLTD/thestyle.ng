
// import { EyeIcon } from "lucide-react";
import { Input } from "@/app-components/ui/input";
import { Button } from "@/app-components/ui/button";
import Image from "next/image";
import googleIcon from "@/assets/google.svg"
import fbIcon from "@/assets/fb.svg"
import appleIcon from "@/assets/apple.svg"
import Link from "next/link";
const SignupForm = () => {
  return (
    <div className="w-full">
      <h2 className="text-lg font-bold mb-1">SIGN UP</h2>
      <p className="text-sm text-gray-500 mb-4">
        Already have an account? <Link href="/" className="text-black underline">Log in</Link>
      </p>

      <div className="space-y-4 ">
       
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="text-xs text-grey-text font-semibold  block mb-1">FIRST NAME</label>
            <Input
              type="text"
              placeholder="Enter your first name"
              className="border border-grey-lighter h-11 rounded-none text-sm"
            />
          </div>
          <div className="flex-1">
            <label className="text-xs text-grey-text font-semibold  block mb-1">LAST NAME</label>
            <Input
              type="text"
              placeholder="Enter your last name"
              className="border border-grey-lighter h-11 rounded-none text-sm"
            />
          </div>
        </div>

        <div>
          <label className="text-xs text-grey-text font-semibold  block mb-1">EMAIL ADDRESS</label>
          <Input
            type="email"
            placeholder="you@email.com"
            className="border border-grey-lighter rounded-none focus:outline-none w-100 h-11 text-sm"
          />
        </div>

        {/* <div>
          <label className="text-xs text-grey-text font-semibold  block mb-1">PASSWORD</label>
          <div className="relative">
            <Input
              type="password"
              className="border border-grey-lighter rounded-none focus:outline-none w-100 h-11 text-sm"
            />
                
          </div>
        </div> */}

        <Button className="w-100 h-11 border bg-black text-white py-2 rounded font-medium">SIGN UP</Button>

        <div className="space-y-2 pt-3">
          <Button className="w-100 h-11 border bg-white text-black flex items-center justify-center gap-2 text-sm">
            <Image src={googleIcon} alt="Google" className="w-4 h-4" />
            Continue with Google
          </Button>
          <Button className="w-100 h-11 border bg-white text-black flex items-center justify-center gap-2 text-sm">
            <Image src={fbIcon} alt="Facebook" className="w-4 h-4" />
            Continue with Facebook
          </Button>
          <Button className="w-100 h-11 border bg-white text-black flex items-center justify-center gap-2 text-sm">
            <Image src={appleIcon} alt="Apple" className="w-4 h-4" />
            Continue with Apple
          </Button>
        </div>

        <p className="text-[11px] text-gray-500 text-center pt-2">
          By creating an account, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
