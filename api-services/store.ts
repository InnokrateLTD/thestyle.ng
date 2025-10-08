import useSwr from "swr";
import { fetcher } from "./configs/fetcher";
import { mutationRequest } from "./configs/sendData";
import { ApiResponse, RequestParams } from "@/interfaces-and-types";
import { Store, Banks, BankDetails, Wallet } from "@/interfaces-and-types/report";
import { AxiosResponse } from "axios";
import { ApiRoutes } from "./apiRoutes";
export const addStore = async (values: RequestParams): Promise<AxiosResponse<ApiResponse<null>>> => {
  const result = await mutationRequest(ApiRoutes.CreateStore, "post", values);
  return result;
};

export const editStore = async (id:string, values: RequestParams): Promise<AxiosResponse<ApiResponse<null>>> => {
  const result = await mutationRequest(`${ApiRoutes.EditStore}/${id}/update/`, "put", values);
  return result;
};

export const useGetStore = (service: string = "style-ng") => {
  const swr = useSwr<ApiResponse<Store>>(ApiRoutes.GetStore, (url: string) =>
    fetcher(url, service)
  );

  return {
    resultIsLoading: swr.isLoading,
    resultMutate: swr.mutate,
    result: swr.data?.data ?? null,
  };
};

export const useGetBankLists = (service: string = "style-ng") => {
  const swr = useSwr<ApiResponse<Banks[]>>(ApiRoutes.ListBanks, (url: string) =>
    fetcher(url, service)
  );
  return {
    resultIsLoading: swr.isLoading,
    resultMutate: swr.mutate,
    result: swr.data?.data ?? null,
  };
};

export const useGetBankingDetails = (service: string = "style-ng") => {
  const swr = useSwr<ApiResponse<BankDetails>>(ApiRoutes.GetVendorBankDetails, (url: string) =>
    fetcher(url, service)
  );
  return {
    resultIsLoading: swr.isLoading,
    resultMutate: swr.mutate,
    result: swr.data?.data ?? null,
  };
};

export const addVendorBankDetails = async (values: RequestParams): Promise<AxiosResponse<ApiResponse<null>>> => {
  const result = await mutationRequest(ApiRoutes.CreateVendorBankDetails, "post", values);
  return result;
};

export const editVendorBankDetails = async (values: RequestParams): Promise<AxiosResponse<ApiResponse<null>>> => {
  const result = await mutationRequest(ApiRoutes.EditVendorBankDetails, "put", values);
  return result;
};


export const useGetPayoutsRequest = (service: string = "style-ng") => {
  const swr = useSwr<ApiResponse<Store>>(ApiRoutes.GetPayoutRequests, (url: string) =>
    fetcher(url, service)
  );

  return {
    resultIsLoading: swr.isLoading,
    resultMutate: swr.mutate,
    result: swr.data?.data ?? null,
  };
};
export const useGetWalletBalance = (service: string = "style-ng") => {
  const swr = useSwr<ApiResponse<Wallet>>(ApiRoutes.WalletBalance, (url: string) =>
    fetcher(url, service)
  );

  return {
    resultIsLoading: swr.isLoading,
    resultMutate: swr.mutate,
    result: swr.data?.data ?? null,
  };
};

export const requestPayouts = async (values: RequestParams): Promise<AxiosResponse<ApiResponse<null>>> => {
  const result = await mutationRequest(ApiRoutes.CreatePayoutRequest, "post", values);
  return result;
};
