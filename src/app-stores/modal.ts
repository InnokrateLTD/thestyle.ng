import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";

type ModalType = "login" | "signup"  | "verify" | "verify-suspicious-login"  | "signup-vendor" | "verify-vendor" | "create-password" | "business-setup" | "initiate" | "validate" | "reset" | "reset-sucess" | "cart" | "review" | "wishlist" | null;

type ModalStore = {
  activeModal: ModalType;
  openModal: (modal: ModalType) => void;
  closeModal: () => void;
};

export const useModalStore = create<ModalStore>()(
  devtools(
    persist(
      (set) => ({
        activeModal: null,
        openModal: (modal) => set({ activeModal: modal }),
        closeModal: () => set({ activeModal: null }),
      }),
      {
        name: "modal",
        storage: createJSONStorage(() => sessionStorage)
      }
    )
  )
);
