// import useSwr from "swr";
// import { fetcher } from "./configs/fetcher";
import { mutationRequest } from "./configs/sendData";
import { ApiResponse, RequestParams } from "@/interfaces-and-types";
import { AxiosResponse } from "axios";
// import qs from "query-string";
import { ApiRoutes } from "./apiRoutes";
import { Order } from "@/interfaces-and-types/order";

export const createOrder = async (values: RequestParams): Promise<AxiosResponse<ApiResponse<Order>>> => {
  const result = await mutationRequest(ApiRoutes.CreateOrder, "post", values);
  return result;
};


export const initializePayment = async (values: RequestParams): Promise<AxiosResponse<ApiResponse<null>>> => {
  const result = await mutationRequest(ApiRoutes.InitializePayment, "post", values);
  return result;
};