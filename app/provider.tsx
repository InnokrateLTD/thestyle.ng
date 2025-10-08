"use client";

import { SWRConfig } from "swr";
import { apiRequest } from "@/lib/api";

const fetcher = (url: string) => apiRequest(url, "GET");

export default function SWRProvider({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig
      value={{
        fetcher,
        onError: (error) => console.error("SWR Error:", error),
        refreshInterval: 3000,
        dedupingInterval: 2000,
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
      }}
    >
      {children}
    </SWRConfig>
  );
}
