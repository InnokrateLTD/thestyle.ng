import useSwr from "swr";
import { fetcher } from "./configs/fetcher";
import { mutationRequest } from "./configs/sendData";
import { ApiResponse, RequestParams } from "@/interfaces-and-types";
import { AxiosResponse } from "axios";
import qs from "query-string";
import { ApiRoutes } from "./apiRoutes";
import { Category, SignedURL, ProductResult, SingleProduct, ProductParams, ProductReviewResponse} from "@/interfaces-and-types/product";




export const useCategory = (service: string = "style-ng") => {
  const swr = useSwr<ApiResponse<Category[]>>(ApiRoutes.GetCategory, (url: string) =>
    fetcher(url, service)
  );

  return {
    resultIsLoading: swr.isLoading,
    resultMutate: swr.mutate,
    result: swr.data?.data ?? [],
  };
};

export const useProducts = (
  params: ProductParams = {},
  service: string = "style-ng"
) => {
  // Build query string
  const query = qs.stringify(params, { skipNull: true, skipEmptyString: true });
  const url = query
    ? `${ApiRoutes.GetAllProducts}?${query}`
    : ApiRoutes.GetAllProducts;

  const swr = useSwr<ApiResponse<ProductResult>>(url, (url: string) =>
    fetcher(url, service)
  );

  return {
    resultIsLoading: swr.isLoading,
    resultMutate: swr.mutate,
    result: swr.data?.data?.results ?? [],
  };
};

export const useSingleProduct = (id:string, service: string = "style-ng") => {
  const swr = useSwr<ApiResponse<SingleProduct>>(id ? `${ApiRoutes.SingleProduct}/${id}` : null, (url: string) =>
    fetcher(url, service)
  );
  return {
    resultIsLoading: swr.isLoading,
    resultMutate: swr.mutate,
    result: swr.data?.data ?? null
  };
};
export const addProducts = async (values: RequestParams): Promise<AxiosResponse<ApiResponse<null>>> => {
  const result = await mutationRequest(ApiRoutes.AddProduct, "post", values);
  return result;
};
export const addProductToCart = async (values: RequestParams): Promise<AxiosResponse<ApiResponse<null>>> => {
  const result = await mutationRequest(ApiRoutes.AddToCart, "post", values);
  return result;
};

export const removeProductFromCart = async (id: string | number | undefined): Promise<AxiosResponse<ApiResponse<null>>> => {
  const result = await mutationRequest(`${ApiRoutes.RemoveFromCart}/${id}`, "delete");
  return result;
};

export const getUserCart = (service: string = "style-ng") => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const swr = useSwr<ApiResponse<SingleProduct>>(
    ApiRoutes.GetUserCart,
    (url: string) => fetcher(url, service)
  );

  return {
    resultIsLoading: swr.isLoading,
    resultMutate: swr.mutate,
    result: swr.data?.data ?? null,
  };
}
export async function fetchUserCart(service: string = "style-ng") {
  return fetcher(ApiRoutes.GetUserCart, service);
}
export const getSignedURL = async (): Promise<AxiosResponse<ApiResponse<SignedURL>>> => {
  const result = await mutationRequest(ApiRoutes.GetSignedURL, "post");
  return result;
};

export const addProductReview = async (
  productId: string,
  values: RequestParams
): Promise<AxiosResponse<ApiResponse<null>>> => {
  const url = `products/${productId}/reviews/`;

  const result = await mutationRequest(url, "post", values);

  return result;
};

export const useGetProductReview = (
  productId: string,
  page: number = 1,
  page_size: number = 10,
  service: string = "style-ng"
) => {
  const url = `products/${productId}/reviews/?page=${page}&page_size=${page_size}`;

  const swr = useSwr<ApiResponse<ProductReviewResponse>>(url, (url: string) =>
    fetcher(url, service)
  );

  return {
    resultIsLoading: swr.isLoading,
    resultMutate: swr.mutate,
    result: swr.data?.data?.results ?? [],
  };
};


