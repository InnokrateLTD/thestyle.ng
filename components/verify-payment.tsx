import { useEffect } from "react";
import { verifyPayment } from "@/api-services/order";

export function useVerifyPaymentFromUrl() {
  useEffect(() => {
    const url = new URL(window.location.href);
    const reference = url.searchParams.get("reference");
    if (!reference) {
      console.error("Authorization Code not found in the URL.");
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const res = await verifyPayment(reference);
        if (!cancelled) console.log(res);
      } catch (err) {
        if (!cancelled) console.error(err);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);
}
