import { create } from 'zustand'
import { persist, devtools, createJSONStorage} from "zustand/middleware"

interface StylengAuthStore {
    token: string;
    email: string
    setAuthorizationToken: (token: string) => void
    setEmail: (email: string) => void
}

export const useStylengAuthStore = create<StylengAuthStore>()(
    devtools(
        persist(
            (set) => ({
                token: '',
                email: '',
                setAuthorizationToken: (token) => set(() => ({ token })),
                setEmail: (email) => set(() => ({ email })),
            }),
            {name: 'StylengAuthStore', storage: createJSONStorage(() => sessionStorage)}
        )
    )
)