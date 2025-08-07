"use client";
// import { useState } from "react";
import AppLogo from "./logo";
import {
  SearchIcon,
  HeartIcon,
  HandbagIcon,
  UserIcon,
  ChevronDownIcon,
} from "lucide-react";
import { Button } from "@/app-components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app-components/ui/dropdown-menu";
// import LoginForm from "@/app-components/landing-page/login-form";
// import SignupForm from "@/app-components/landing-page/signup-form";
// import Modal from "@/app-components/landing-page/modal";

const Header = () => {
  // const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);
  // const [isSignupFormOpen, setIsSignupFormOpen] = useState(false);
  return (
    <header className="w-full h-[56px] sm:h-[80px] bg-black">
      <div className="text-sm font-bold w-[98%] h-full mx-auto text-white flex justify-center sm:justify-between items-center">
        <ul className="hidden sm:flex items-center gap-2">
          <li>BLOGS</li>
          <li>FAQ</li>
        </ul>
        <AppLogo />
        <ul className="hidden sm:flex items-center gap-2">
          <li className="border-[1.5px] border-white w-7.5 h-7.5 flex items-center justify-center rounded-full">
            <SearchIcon className="w-5 h-5" />
          </li>
          <li className="border-[1.5px] border-white w-7.5 h-7.5 flex items-center justify-center rounded-full">
            <HeartIcon className="w-5 h-5" />
          </li>
          <li className="border-[1.5px] border-white w-7.5 h-7.5 flex items-center justify-center rounded-full">
            <HandbagIcon className="w-5 h-5" />
          </li>
          <li className="flex items-center gap-1">
            <div className="border-[1.5px] border-white w-7.5 h-7.5 flex items-center justify-center rounded-full">
              <UserIcon className="w-5 h-5" />
            </div>
            <div className="w-[115px] h-10 text-sm flex flex-col justify-center">
              <p>SIGN IN </p>
              <p>YOUR ACCOUNT</p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none cursor-pointer">
                <ChevronDownIcon className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-70 h-45 rounded-none mt-7">
                <DropdownMenuLabel className="pt-7 px-3 pb-3">
                  {/* onClick={() => setIsLoginFormOpen(true)} */}
                  <Button  className="bg-grey w-full h-11 rounded-none">
                    Login
                  </Button>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {/* onClick={() => setIsSignupFormOpen(true)} */}
                <DropdownMenuItem>Sign up as a Vendor</DropdownMenuItem>
                <DropdownMenuItem>Sign Up as a buyer</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        </ul>
      </div>
      {/* <Modal isOpen={isLoginFormOpen} onClose={() => setIsLoginFormOpen(false)}>
          <LoginForm />
      </Modal>
      <Modal isOpen={isSignupFormOpen} onClose={() => setIsSignupFormOpen(false)}>
          <SignupForm />
      </Modal> */}
    </header>
  );
};
export default Header;
