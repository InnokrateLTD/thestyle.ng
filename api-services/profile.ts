import useSwr from "swr";
import { fetcher } from "./configs/fetcher";
import { mutationRequest } from "./configs/sendData";
import { ApiResponse, RequestParams } from "@/interfaces-and-types";
import { AxiosResponse } from "axios";
// import qs from "query-string";
import { ApiRoutes } from "./apiRoutes";
import { OrderResponse, Order } from "@/interfaces-and-types/order";
import { Address, Profile } from "@/interfaces-and-types/profile";

export const updateUserProfile = async (values: RequestParams): Promise<AxiosResponse<ApiResponse<Order>>> => {
  const result = await mutationRequest(ApiRoutes.UpdateProfile, "put", values);
  return result;
};

export const addAddress = async (values: RequestParams): Promise<AxiosResponse<ApiResponse<null>>> => {
  const result = await mutationRequest(`${ApiRoutes.AddAddress}/`, "post", values);
  return result;
};
export const setDefaultAddress = async (id: string): Promise<AxiosResponse<ApiResponse<null>>> => {
  const result = await mutationRequest(`${ApiRoutes.AddAddress}/${id}/set-default/`, "post");
  return result;
};
export const deleteAddress = async (id: string): Promise<AxiosResponse<ApiResponse<null>>> => {
  const result = await mutationRequest(`${ApiRoutes.AddAddress}/${id}/`, "delete");
  return result;
};
export const editAddress = async (id: string, values: RequestParams): Promise<AxiosResponse<ApiResponse<null>>> => {
  const result = await mutationRequest(`${ApiRoutes.AddAddress}/${id}/`, "put", values);
  return result;
};
export const useGetProfile = (service: string = "style-ng") => {
  const swr = useSwr<ApiResponse<Profile>>(ApiRoutes.GetProfile, (url: string) =>
    fetcher(url, service)
  );
  return {
    resultIsLoading: swr.isLoading,
    resultMutate: swr.mutate,
    result: swr.data?.data ?? null
  };
};

export const useGetAddresses = (service: string = "style-ng") => {
  const swr = useSwr<ApiResponse<Address[]>>(ApiRoutes.AddAddress, (url: string) =>
    fetcher(url, service)
  );
  return {
    resultIsLoading: swr.isLoading,
    resultMutate: swr.mutate,
    result: swr.data?.data ?? null
  };
};
export const useGetOrder = (service: string = "style-ng") => {
  const swr = useSwr<ApiResponse<OrderResponse>>(ApiRoutes.ListOrders, (url: string) =>
    fetcher(url, service)
  );
  return {
    resultIsLoading: swr.isLoading,
    resultMutate: swr.mutate,
    result: swr.data?.data ?? null
  };
};
export const resetPassword = async (values: RequestParams): Promise<AxiosResponse<ApiResponse<null>>> => {
  const result = await mutationRequest(ApiRoutes.ResetProfilePassword, "post", values);
  return result;
};