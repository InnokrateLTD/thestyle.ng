import axios from "axios";
import { getCookie } from 'cookies-next'
export const axiosInstance = (service: string = "style-ng") => {
  const isStyleNg = service === "style-ng";
  const token = getCookie(isStyleNg ? "SNG_A" : "PY_AD");

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${String(token)}`;
  }

  return axios.create({
    baseURL: isStyleNg
      ? process.env.NEXT_PUBLIC_API_URL
      : process.env.NEXT_PUBLIC_ADMIN_API_URL,
    headers,
  });
};
export const fetcher = (url: string, service: string = "style-ng") =>
  axiosInstance(service)
    .get(url)
    .then((res) => res.data)
    .catch((err) => {
      if (err.response?.status === 401) {
        if (service === "style-ng") {
          window.location.href = "/";
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
