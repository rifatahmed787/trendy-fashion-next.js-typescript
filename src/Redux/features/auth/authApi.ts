import {
  IGoogleLoginArgs,
  ILoginArgs,
  ILoginRes,
  IRegister,
  IRegisterRes,
} from "@/Types/auth.types";
import { apiSlice } from "../../api/apiSlice";
import { login } from "./authSlice";
import Cookies from "js-cookie";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    userRegister: builder.mutation<IRegisterRes, IRegister>({
      query: (data) => ({
        url: "/auth/signup",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(loginArgs, { dispatch, queryFulfilled }) {
        try {
          const signupRes = await queryFulfilled;

          if (signupRes) {
            dispatch(
              login({
                isLoggedIn: true,
                user: signupRes?.data?.data?.user_details || null,
                accessToken: signupRes?.data?.data?.accessToken || null,
                refreshToken: signupRes?.data?.data?.refreshToken || null,
              })
            );

            Cookies.set(
              "user",
              JSON.stringify({
                user: signupRes?.data?.data?.user_details,
                isLoggedIn: true,
              })
            );

            Cookies.set("token", signupRes?.data?.data?.accessToken ?? "");
          }
        } catch {
          //do nothing
          console.log({ loginArgs });
        }
      },
    }),


    otpSignup:builder.mutation({
      query:(data)=>({
        url: "/auth/send-otp",
        method: "POST",
        body: data,
      })
    }),


    userLogin: builder.mutation<ILoginRes, ILoginArgs>({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      
      async onQueryStarted(loginArgs, { dispatch, queryFulfilled }) {
        try {
          const loginRes = await queryFulfilled;
          console.log(loginRes);

          if (loginRes) {
            dispatch(
              login({
                isLoggedIn: true,
                user: loginRes?.data?.data?.user_details || null,
                accessToken: loginRes?.data?.data?.accessToken || null,
                refreshToken: loginRes?.data?.data?.refreshToken || null,
              })
            );

            Cookies.set(
              "user",
              JSON.stringify({
                user: loginRes?.data?.data?.user_details,
                isLoggedIn: true,
              })
            );

            Cookies.set("token", loginRes?.data?.data?.accessToken ?? "");
          }
        } catch {
          //do nothing
          console.log({ loginArgs });
        }
      },
      invalidatesTags:["cart", "wishlist"],
    }),

  // user google login
    userGoogleLogin: builder.mutation<ILoginRes, IGoogleLoginArgs>({
      query: (data) => ({
        url: "/auth/google-login",
        method: "POST",
        body: data,
      }),
      
      async onQueryStarted(loginArgs, { dispatch, queryFulfilled }) {
        try {
          const loginRes = await queryFulfilled;
          console.log(loginRes);

          if (loginRes) {
            dispatch(
              login({
                isLoggedIn: true,
                user: loginRes?.data?.data?.user_details || null,
                accessToken: loginRes?.data?.data?.accessToken || null,
                refreshToken: loginRes?.data?.data?.refreshToken || null,
              })
            );

            Cookies.set(
              "user",
              JSON.stringify({
                user: loginRes?.data?.data?.user_details,
                isLoggedIn: true,
              })
            );

            Cookies.set("token", loginRes?.data?.data?.accessToken ?? "");
          }
        } catch {
          //do nothing
          console.log({ loginArgs });
        }
      },
      invalidatesTags:["cart", "wishlist"],
    }),

    userLogOut: builder.mutation<unknown, void>({
      query: (data) => ({
        url: "/auth/logout",
        method: "POST",
        body: data,
      }),
    }),

    // getUserDetails: builder.query<IGetUserDetailsRes, IGetUserDetailsArgs>({
    //   query: () => ({
    //     url: "/auth/get-user-details",
    //     method: "GET",
    //   }),
    // }),
  }),
});

export const {
  useUserLoginMutation,
  useOtpSignupMutation,
  useUserRegisterMutation,
  useUserLogOutMutation,
  useUserGoogleLoginMutation
  // useGetUserDetailsQuery,
} = authApi;
