import { LoginRequest, LoginResponse } from "../models/reqres/authentication/loginReqRes";
import { ChangePasswordRequest, ChangePasswordResponse } from "../models/reqres/authentication/changePasswordReqRes";
import { setLoggedIn } from "../slices/loginSlice";
import { alacrityApi } from "./api";

const authenticationApi = alacrityApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, Partial<LoginRequest>>({
      query: (request) => ({
        url: '/authentication/login',
        method: 'POST',
        body: request,
        responseHandler: 'text',
      }),
      transformResponse: (res: Response, meta, arg) => {
        meta?.dispatch(setLoggedIn(true));
        return { succeeded: true, error: undefined };
      },
      transformErrorResponse: (response: { status: number, data: string }, meta, arg) => {
        return { succeeded: false, status: response.status?.toString(), error: response.data }
      },
    }),
    logout: build.mutation<any, any>({
      query: (request) => ({
        url: '/authentication/logout',
        method: 'POST',
      }),
      transformResponse: (res: Response, meta, arg) => {
        meta?.dispatch(setLoggedIn(false));
      }
    }),
    changePassword: build.mutation<ChangePasswordResponse, ChangePasswordRequest>({
      query: (request) => ({
        url: '/authentication/changePassword',
        method: 'PUT',
        body: request
      })
    })
  })
});

export const { useLoginMutation, useLogoutMutation, useChangePasswordMutation } = authenticationApi;