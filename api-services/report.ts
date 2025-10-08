import useSwr from "swr";
import { fetcher } from "./configs/fetcher";
import { ApiResponse } from "@/interfaces-and-types";
import { ApiRoutes } from "./apiRoutes";
import qs from "query-string";
import { ProductViewedParams, ProductViewedResponse, SalesParams, SalesResponseResult } from "@/interfaces-and-types/product";

export const useGetProductViewed = (
  params: ProductViewedParams = {},
  service: string = "style-ng"
) => {
  // Build query string
  const query = qs.stringify(params, { skipNull: true, skipEmptyString: true });
  const url = query
    ? `${ApiRoutes.ProductViewed}?${query}`
    : ApiRoutes.ProductViewed;

  const swr = useSwr<ApiResponse<ProductViewedResponse>>(url, (url: string) =>
    fetcher(url, service)
  );

  return {
    resultIsLoading: swr.isLoading,
    resultMutate: swr.mutate,
    result: swr.data?.data.results ?? [],
  };
};

export const useGetSales = (
  params: SalesParams = {},
  service: string = "style-ng"
) => {
  // Build query string
  const query = qs.stringify(params, { skipNull: true, skipEmptyString: true });
  const url = query
    ? `${ApiRoutes.SalesReport}?${query}`
    : ApiRoutes.SalesReport;

  const swr = useSwr<ApiResponse<SalesResponseResult>>(url, (url: string) =>
    fetcher(url, service)
  );

  return {
    resultIsLoading: swr.isLoading,
    resultMutate: swr.mutate,
    result: swr.data?.data.results ?? [],
  };
};