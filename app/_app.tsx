// pages/_app.tsx
import { SWRConfig } from "swr";
import { AppProps } from "next/app";
import { apiRequest } from "@/lib/api";

const fetcher = (url: string) => apiRequest(url, "GET");

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher,
        onError: (error) => {
          console.error("SWR Error:", error);
        },
        refreshInterval: 3000,
        dedupingInterval: 2000,
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
      }}
    >
      <Component {...pageProps} /> 
    </SWRConfig>
  );
}

export default MyApp;
