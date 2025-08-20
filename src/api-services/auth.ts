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

export const signupVendor = async (values: RequestParams): Promise<AxiosResponse<ApiResponse<SignUpResponse>>> => {
  const result = await mutationRequest(ApiRoutes.RegisterVendor, "post", values);
  return result;
};

export const verifyUser = async (values: RequestParams): Promise<AxiosResponse<ApiResponse<null>>> => {
  const result = await mutationRequest(ApiRoutes.VerifyEmail, "post", values);
  return result;
};

export const verifyVendor = async (values: RequestParams): Promise<AxiosResponse<ApiResponse<null>>> => {
  const result = await mutationRequest(ApiRoutes.VerifyVendorEmail, "post", values);
  return result;
};

export const createPassword = async (values: RequestParams): Promise<AxiosResponse<ApiResponse<null>>> => {
  const result = await mutationRequest(ApiRoutes.CreatePassword, "post", values);
  return result;
};

export const businessAccSetup = async (values: RequestParams): Promise<AxiosResponse<ApiResponse<null>>> => {
  const result = await mutationRequest(ApiRoutes.SetupBusinessAcccount, "post", values);
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

export const initiatePasswordReset = async (values: RequestParams): Promise<AxiosResponse<ApiResponse<LoginResponse>>> =>{
    const result = await mutationRequest(ApiRoutes.InitiateResetPassword, "post", values)
    return result
}
export const validatePassword = async (values: RequestParams): Promise<AxiosResponse<ApiResponse<LoginResponse>>> =>{
    const result = await mutationRequest(ApiRoutes.ValidatePasswordToken, "post", values)
    return result
}

export const resetPassword = async (values: RequestParams): Promise<AxiosResponse<ApiResponse<LoginResponse>>> =>{
    const result = await mutationRequest(ApiRoutes.ResetPassword, "post", values)
    return result
}