import useSwr from "swr";
import { fetcher } from "./configs/fetcher";
import { mutationRequest } from "./configs/sendData";
import { ApiResponse, RequestParams } from "@/interfaces-and-types";
import { AxiosResponse } from "axios";
import qs from "query-string";
import { ApiRoutes } from "./apiRoutes";
import { Order } from "@/interfaces-and-types/order";

export const updateUserProfile = async (values: RequestParams): Promise<AxiosResponse<ApiResponse<Order>>> => {
  const result = await mutationRequest(ApiRoutes.UpdateProfile, "put", values);
  return result;
};


export const useGetProfile = (service: string = "style-ng") => {
  const swr = useSwr<ApiResponse<null>>(ApiRoutes.GetProfile, (url: string) =>
    fetcher(url, service)
  );
  return {
    resultIsLoading: swr.isLoading,
    resultMutate: swr.mutate,
    result: swr.data?.data ?? null
  };
};