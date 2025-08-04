import axios from "axios";
import { getCookie } from 'cookies-next'
export const axiosInstance = (
    service: string = "pyforensics"
  ) =>
    axios.create({
      baseURL:
        service === "pyforensics"
          ? process.env.NEXT_PUBLIC_API_URL
          : process.env.NEXT_PUBLIC_ADMIN_API_URL,
          headers: {
            Authorization: `Bearer ${String(getCookie(service === "pyforensics" ? "PY_A" : "PY_AD"))}`,
            "Content-Type": "application/json",
          },
});
export const fetcher = (url: string, service: string = "pyforensics") =>
  axiosInstance(service)
    .get(url)
    .then((res) => res.data)
    .catch((err) => {
      if (err.response?.status === 401) {
        if (service === "pyforensics") {
          window.location.href = "/login";
        } else {
          window.location.href = "/admin-login";
        }
        return Promise.reject(new Error("No token, redirecting to login."));
      }
      return Promise.resolve({
        error: true,
        message: err.response?.data?.message,
        status: err.response?.status || "Unknown",
      });
    });
