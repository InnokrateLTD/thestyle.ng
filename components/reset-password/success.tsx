"use client";
import { Button } from "@/components/ui/button";
import { useModalStore } from "@/stores/modal";

const PasswordResetSuccess = () => {
  const { openModal } = useModalStore()
 
  return (
    <div className="w-full">
      <div className="space-y-4 flex flex-col">
        <div>
          <h2 className="text-lg font-bold mb-1 uppercase">Password reset</h2>
          <p className="text-sm text-gray-500 mb-4">
            Your password has been successfully reset. Click below to log in.
          </p>
        </div>
        <form className="space-y-4">
          
          <Button onClick={() => openModal("login")} className="w-100 h-11 bg-black text-white rounded-none font-medium uppercase">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PasswordResetSuccess;
