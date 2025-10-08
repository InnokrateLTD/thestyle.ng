import { fetcher } from "./configs/fetcher";
import { mutationRequest } from "./configs/sendData";
import { ApiResponse, RequestParams } from "@/interfaces-and-types";
import { AxiosResponse } from "axios";
// import qs from "query-string";
import { ApiRoutes } from "./apiRoutes";

export async function fetchUserWishlist(service: string = "style-ng") {
  return fetcher(`${ApiRoutes.WishList}/`, service);
}

export const addToWishlist = async (values: RequestParams): Promise<AxiosResponse<ApiResponse<null>>> => {
  const result = await mutationRequest(`${ApiRoutes.WishList}/`, "post", values);
  return result;
};

export const removeFromWishlist = async (id: string | number | undefined): Promise<AxiosResponse<ApiResponse<null>>> => {
  const result = await mutationRequest(`${ApiRoutes.WishList}/${id}`, "delete");
  return result;
};


