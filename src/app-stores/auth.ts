import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";
import { SignedURL } from "@/interfaces-and-types/product";
import { StylengUser } from "@/interfaces-and-types/auth";

interface StylengAuthStore {
  token: string;
  email: string;
  password: string;
  provider: string;
  signedURL: SignedURL;
  stylengUser: StylengUser;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setToken: (token: string) => void;
  setEmail: (email: string) => void;
  setSignedURL: (SignedURL: SignedURL) => void;
  setStylengUser: (stylengUser: StylengUser) => void;
  setPassword: (password: string) => void;
  setProvider: (provider: string) => void;
}

export const useStylengAuthStore = create<StylengAuthStore>()(
  devtools(
    persist(
      (set) => ({
        token: "",
        email: "",
        provider: "",
        password: "",
        isLoggedIn: false,
        stylengUser: {
          id: "",
          email: "",
          first_name: "",
          last_name: "",
          is_active: false,
          date_joined: "",
          must_change_password: false,
          role: "",
          profile_photo: null,
        },
        signedURL: {
          signed_url: "",
          api_key: "",
          timestamp: "",
          folder: "",
          signature: "",
          upload_preset: "",
        },
        setSignedURL: (signedURL) => set(() => ({ signedURL })),
        setStylengUser: (stylengUser) => set(() => ({ stylengUser })),
        setToken: (token) => set(() => ({ token })),
        setEmail: (email) => set(() => ({ email })),
        setPassword: (password) => set(() => ({ password })),
        setProvider: (provider) => set(() => ({ provider })),
        setIsLoggedIn:(isLoggedIn) => set(() => ({ isLoggedIn})),
      }),
      {
        name: "StylengAuthStore",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
