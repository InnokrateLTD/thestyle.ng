import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { getCookie, setCookie } from 'cookies-next'
import { refreshToken } from "../auth";
export const axiosInstance = (service: string = "style-ng") => {
  const isStyleNg = service === "style-ng";

  const instance = axios.create({
    baseURL: isStyleNg
      ? process.env.NEXT_PUBLIC_API_URL
      : process.env.NEXT_PUBLIC_ADMIN_API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Attach token to every request
  instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = getCookie(isStyleNg ? "SNG_A" : "PY_AD");
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${String(token)}`;
    }
    return config;
  });

  // Handle 401 errors globally
  instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      // eslint-disable-next-line
      const originalRequest: any = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const refresh_token = getCookie("ref");
          if (!refresh_token) {
            window.location.href = isStyleNg ? "/" : "/admin-login";
            return Promise.reject(error);
          }

          // Call refresh token API
          const response =
            await refreshToken({ refreshToken: refresh_token });

          // Save new tokens
          setCookie(isStyleNg ? "SNG_A" : "PY_AD", response.data.data.token.access_token);
          setCookie("ref", response.data.data.token.refresh_token);

          // Update Authorization header and retry original request
          originalRequest.headers["Authorization"] = `Bearer ${response.data.data.token.access_token}`;
          return instance(originalRequest);
        } catch (err) {
          // Refresh failed → redirect to login
          window.location.href = isStyleNg ? "/" : "/admin-login";
          return Promise.reject(err);
        }
      }

      return Promise.reject(error);
    }
  );

  return instance;
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
