
import { fetcher } from "./configs/fetcher";
import { mutationRequest } from "./configs/sendData";
import { ApiResponse, RequestParams } from "@/interfaces-and-types";
import { AxiosResponse } from "axios";
// import qs from "query-string";
import { ApiRoutes } from "./apiRoutes";
import { Order, PaymentData, PromoCode } from "@/interfaces-and-types/order";


export const createOrder = async (values: RequestParams): Promise<AxiosResponse<ApiResponse<Order>>> => {
  const result = await mutationRequest(ApiRoutes.CreateOrder, "post", values);
  return result;
};

export const addPromoCode = async (values: RequestParams): Promise<AxiosResponse<ApiResponse<PromoCode>>> => {
  const result = await mutationRequest(ApiRoutes.AddPromoCode, "post", values);
  return result
}

export const initializePayment = async (values: RequestParams): Promise<AxiosResponse<ApiResponse<PaymentData>>> => {
  const result = await mutationRequest(ApiRoutes.InitializePayment, "post", values);
  return result;
};

// export const verifyPayment = (ref: string, service: string = "style-ng") => {
//   // eslint-disable-next-line react-hooks/rules-of-hooks
//   const swr = useSwr<ApiResponse<null>>(
//     `${ApiRoutes.VerifyPayment}/${ref}`,
//     (url: string) => fetcher(url, service)
//   );
//   return {
//     resultIsLoading: swr.isLoading,
//     resultMutate: swr.mutate,
//     result: swr.data?.data ?? null,
//   };
// }

export async function verifyPayment(ref: string, service: string = "style-ng") {
  return fetcher( `${ApiRoutes.VerifyPayment}/${ref}`, service);
}