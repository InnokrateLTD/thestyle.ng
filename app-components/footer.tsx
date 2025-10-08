import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "@/app-components/ui/avatar";
import Image from "next/image";
const Footer = () => {
  return (
    <footer className="w-full mt-20">
      <div className="bg-grey w-full">
        <div className="w-[97%] mx-auto flex flex-col gap-4 sm:gap-0 sm:flex-row justify-between sm:h-53 py-3  sm:py-0 items-center">
          <div className="flex flex-col gap-4">
            <h2 className="uppercase text-xl font-bold text-white">
              Never miss a thing
            </h2>
            <p className="text-sm font-normal text-grey-light sm:w-124">
              Sign up for promotions, tailored new arrivals, stock updates and
              more – straight to your inbox
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="border border-white h-10 rounded-none text-sm placeholder:text-grey-light"
              />
              <Button className="bg-white text-grey font-semibold uppercase py-2 px-4 transition w-40 h-10 hover:bg-grey hover:text-white rounded-none">
                subscribe
              </Button>
            </div>
          </div>
          <div className="flex justify-between gap-15">
            <ul className="text-white flex flex-col gap-3">
              <li className="text-gray-500 font-semibold text-sm uppercase">
                Company
              </li>
              <li className="text-sm font-medium">About us</li>
            </ul>
            <ul className="text-white flex flex-col gap-3">
              <li className="text-gray-500 font-semibold text-sm uppercase">
                Need help?
              </li>
              <li className="text-sm font-medium">Contact us</li>
              <li className="text-sm font-medium">FAQ</li>
            </ul>
            <ul className="text-white flex flex-col gap-3">
              <li className="text-gray-500 font-semibold text-sm uppercase">
                Legal
              </li>
              <li className="text-sm font-medium">Privacy Policy</li>
              <li className="text-sm font-medium">Terms & Condition</li>
              <li className="text-sm font-medium">Returns & Refund</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-white w-full">
        <div className="w-[97%] mx-auto  flex flex-col justify-between">
          <div className="flex flex-col gap-4 sm:gap-0 sm:flex-row justify-between items-center  border-b py-5">
            <div className="flex flex-col gap-4">
              <h2 className="uppercase font-semibold text-xs text-gray-500">
                Socials
              </h2>
              <div className="flex gap-2">
                <Avatar className=" bg-grey w-8 h-8 flex items-center justify-center">
                  <AvatarImage
                    src="/X_logo.svg"
                    className="object-contain w-4 h-4"
                    alt="X Logo"
                  />
                </Avatar>
                <Avatar className=" bg-grey w-8 h-8 flex items-center justify-center">
                  <AvatarImage
                    src="/instagram.svg"
                    className="object-contain w-4 h-4"
                    alt="instagram Logo"
                  />
                </Avatar>
                <Avatar className=" bg-grey w-8 h-8 flex items-center justify-center">
                  <AvatarImage
                    src="/logo-tiktok.svg"
                    className="object-contain w-4 h-4"
                    alt="Tiktok Logo"
                  />
                </Avatar>
                <Avatar className=" bg-grey w-8 h-8 flex items-center justify-center">
                  <AvatarImage
                    src="/fb.svg"
                    className="object-contain w-4 h-4"
                    alt="FB Logo"
                  />
                </Avatar>
                <Avatar className=" bg-grey w-8 h-8 flex items-center justify-center">
                  <AvatarImage
                    src="/linkedin.svg"
                    className="object-contain w-4 h-4"
                    alt="Linkedin Logo"
                  />
                </Avatar>
                <Avatar className=" bg-grey w-8 h-8 flex items-center justify-center">
                  <AvatarImage
                    src="/youtube.svg"
                    className="object-cover w-4 h-4"
                    alt="Youtube Logo"
                  />
                </Avatar>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="uppercase font-semibold text-xs text-gray-500">
                Accepted Payments
              </h2>
              <div className="flex gap-2">
                <Image
                  src="/visa.svg"
                  alt="Visa Logo"
                  width={74}
                  height={74}
                ></Image>
                <Image
                  src="/mastercard.svg"
                  alt="Mastercard Logo"
                  width={31}
                  height={24}
                ></Image>
                <Image
                  src="/paystack.svg"
                  alt="Paystack Logo"
                  width={24}
                  height={24}
                ></Image>
                <Image
                  src="/verve.svg"
                  alt="Verve Logo"
                  width={70}
                  height={24}
                ></Image>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center py-5">
                 <p className="text-gray-500 text-xs font-normal text-center">
          &copy; 2025 The Style Fashion Group. All rights reserved. </p>
          </div>
        </div>
        
      </div>
    </footer>
  );
};
export default Footer;
