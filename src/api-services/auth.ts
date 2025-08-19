// import useSwr, { SWRResponse } from "swr";
import { mutationRequest } from "./configs/sendData";
import { ApiRoutes } from "./apiRoutes";
import { ApiResponse, RequestParams } from "@/interfaces-and-types";
import { SignUpResponse, LoginResponse, AuthProviderResponse} from "@/interfaces-and-types/auth";
import { AxiosResponse } from "axios";

export const signupBuyer = async (values: RequestParams): Promise<AxiosResponse<ApiResponse<SignUpResponse>>> => {
  const result = await mutationRequest(ApiRoutes.RegisterBuyer, "post", values);
  return result;
};

export const verifyUser = async (values: RequestParams): Promise<AxiosResponse<ApiResponse<null>>> => {
  const result = await mutationRequest(ApiRoutes.VerifyEmail, "post", values);
  return result;
};

export const resendVerificationCode = async (values: RequestParams): Promise<AxiosResponse<ApiResponse<null>>> => {
  const result = await mutationRequest(ApiRoutes.ResendVerifyEmail, "post", values);
  return result;
};

export const loginBuyer = async (values: RequestParams): Promise<AxiosResponse<ApiResponse<LoginResponse>>> => {
  const result = await mutationRequest(ApiRoutes.LoginBuyer, "post", values);
  return result;
};
export const getSocialAuthURL = async (values: RequestParams): Promise<AxiosResponse<ApiResponse<AuthProviderResponse>>> =>{
    const result = await mutationRequest(ApiRoutes.SocialAuthURL, "post", values)
    return result
}
export const getSocialAuthCallBack = async (values: RequestParams): Promise<AxiosResponse<ApiResponse<LoginResponse>>> =>{
    const result = await mutationRequest(ApiRoutes.GetSocialCallBack, "post", values)
    return result
}