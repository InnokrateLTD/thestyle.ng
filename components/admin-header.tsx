"use client";
import AppLogo from "./landing-page/logo";
import {
  UserIcon,
  ChevronDownIcon,
  Bell,
  Store
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import LoginForm from "@/components/landing-page/login-form";
import SignupForm from "@/components/landing-page/signup-form";
import SignupVendorForm from "./vendors/signup";
import VerifyForm from "./landing-page/verify";
import VerifyVendorForm from "./vendors/verify";
import BusinessInfo from "./vendors/businessInfo";
import CreatePassword from "./vendors/createPassword";
import InitiatePasswordReset from "./reset-password/initiate";
import ValidatePasswordCode from "./reset-password/validate";
import CreateResetPassword from "./reset-password/password";
import PasswordResetSuccess from "./reset-password/success";
import VerifySuspiciousForm from "./landing-page/verify-suspicious-login";
import ReviewProduct from "./product-page/review-product";
import Cart from "./cart";
import Modal from "@/components/landing-page/modal";
import { useModalStore } from "@/stores/modal";
import Wishlist from "./wishlist";
import FilterProduct from "./product-page/filter-product";
import FilterOrder from "./product-page/filter-order";
import PayoutRequest from "./vendors/payoutRequest";
import { useStylengAuthStore } from "@/stores/auth";
const AdminHeader = () => {
  const { activeModal, openModal, closeModal } = useModalStore();
  const username = useStylengAuthStore((state) => state.stylengUser.first_name)
  const router = useRouter()
  return (
    <header className="w-full h-[56px] sm:h-[80px] bg-black">
      <div className=" w-[98%] h-full mx-auto text-white flex justify-center sm:justify-between items-center">
        
        
        <div className="flex gap-2">
            <AppLogo />
            <p>Location: Lagos Nigeria</p>
        </div>
        <ul className="hidden text-sm font-bold sm:flex items-center gap-2">
            <li onClick={() => router.push('/vendors-app/store-info')} className="cursor-pointer font-medium space-x-2 border p-2  flex items-center justify-center">
            <Store className="w-5 h-5" /> 
            <p>View Store</p>
          </li>
          <li className="border-[1.5px] border-white w-7.5 h-7.5 flex items-center justify-center rounded-full">
            <Bell className="w-5 h-5" />
          </li>
          
          <li className="flex items-center gap-1">
            <div onClick={() => router.push('/profile')} className="border-[1.5px] border-white w-7.5 h-7.5 flex items-center justify-center rounded-full cursor-pointer">
              <UserIcon className="w-5 h-5" />
            </div>
            <div className="w-[75px] h-10 text-sm flex flex-col justify-center">
              {`${username ?? 'User'} store`}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none cursor-pointer">
                <ChevronDownIcon className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-70 h-45 rounded-none mt-7">
                <DropdownMenuLabel className="pt-7 px-3 pb-3">
                  
                  <Button onClick={() => openModal('login')}  className="bg-grey w-full h-11 rounded-none">
                    Login
                  </Button>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                
                <DropdownMenuItem className="cursor-pointer" onClick={() => openModal('signup-vendor')}>Sign up as a Vendor</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={() => openModal('signup')}>Sign Up as a buyer</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        </ul>
      </div>
      <Modal isOpen={activeModal === "login"} onClose={closeModal}>
          <LoginForm />
      </Modal>
      <Modal isOpen={activeModal === "signup"} onClose={closeModal}>
          <SignupForm />
      </Modal>
      <Modal isOpen={activeModal === "signup-vendor"} onClose={closeModal}>
          <SignupVendorForm />
      </Modal>
      <Modal isOpen={activeModal === "verify"} onClose={closeModal}>
          <VerifyForm />
      </Modal>
      <Modal isOpen={activeModal === "verify-vendor"} onClose={closeModal}>
          <VerifyVendorForm />
      </Modal>
      <Modal isOpen={activeModal === "create-password"} onClose={closeModal}>
          <CreatePassword />
      </Modal>
      <Modal isOpen={activeModal === "business-setup"} onClose={closeModal}>
          <BusinessInfo />
      </Modal>
      <Modal isOpen={activeModal === "initiate"} onClose={closeModal}>
          <InitiatePasswordReset />
      </Modal>
      <Modal isOpen={activeModal === "validate"} onClose={closeModal}>
          <ValidatePasswordCode />
      </Modal>
      <Modal isOpen={activeModal === "reset"} onClose={closeModal}>
          <CreateResetPassword />
      </Modal>
      <Modal isOpen={activeModal === "reset-sucess"} onClose={closeModal}>
          <PasswordResetSuccess />
      </Modal>
      <Modal isOpen={activeModal === "verify-suspicious-login"} onClose={closeModal}>
          <VerifySuspiciousForm />
      </Modal>
      <Modal isOpen={activeModal === "cart"} onClose={closeModal}>
          <Cart />
      </Modal>
      <Modal isOpen={activeModal === "review"} onClose={closeModal}>
          <ReviewProduct />
      </Modal>
      <Modal isOpen={activeModal === "wishlist"} onClose={closeModal}>
          <Wishlist />
      </Modal>
      <Modal isOpen={activeModal === "filter"} onClose={closeModal}>
                <FilterProduct />
      </Modal>
      <Modal isOpen={activeModal === "filter-order"} onClose={closeModal}>
                <FilterOrder />
      </Modal>
      <Modal isOpen={activeModal === "payout"} onClose={closeModal}>
        <PayoutRequest/>
      </Modal>
    </header>
  );
};
export default AdminHeader;
