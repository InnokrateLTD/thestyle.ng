import { create } from 'zustand'
import { persist, devtools, createJSONStorage} from "zustand/middleware"

interface StylengAuthStore {
    token: string;
    email: string;
    provider: string;
    setToken: (token: string) => void
    setEmail: (email: string) => void;
    setProvider: (provider: string) => void;
}

export const useStylengAuthStore = create<StylengAuthStore>()(
    devtools(
        persist(
            (set) => ({
                token: '',
                email: '',
                provider: '',
                setToken: (token) => set(() => ({ token })),
                setEmail: (email) => set(() => ({ email })),
                setProvider: (provider) => set(() => ({ provider})),
            }),
            {name: 'StylengAuthStore', storage: createJSONStorage(() => sessionStorage)}
        )
    )
)