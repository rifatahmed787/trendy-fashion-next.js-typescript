export interface IUser {
  id?: number;
  email?: string;
  username: string;
  hasVerifiedEmail?: boolean;
  role?: "ADMIN" | "USER";
  avatar: string;
  phoneNumber?: string;
  location?: string;
  createdAt: string;
  updatedAt: string;
}

//auth slice types
export interface IAuthState {
  isLoggedIn: boolean;
  user: IUser | null;
  accessToken: string | null;
  refreshToken: string | null;
}

/*auth register type*/
// user register types
export interface IRegister {
  username: string;
  email: string;
  password: string;
  otp:string;
}

export interface IRegisterData {
  user_details?: IUser | null;
  email: string | null;
  error: string;
  accessToken?: string | null;
  refreshToken?: string | null;
}
export interface IRegisterRes {
  status?: boolean;
  message: string;
  data?: IRegisterData;
  refreshToken?: string | null;
}

/* login api start */
export interface ILoginArgs {
  email?: string;
  phoneNumber?:string;
  password: string;
}

export interface IGoogleLoginArgs {
  username: string;
  email: string;
  avatar:string;
  googleId:string | undefined;
}

export interface ILoginData {
  user_details?: IUser | null;
  accessToken?: string | null;
  refreshToken?: string | null;
}

export interface ILoginRes {
  message: string;
  data?: ILoginData;
}

export interface ILoginAction {
  type: string;
  payload: {
    user: IUser;
    accessToken: string;
    refreshToken: string;
  };
}

export interface IGetUserDetailsRes {
  id: number;
  userName: string;
  email: string;
  avatar: string;
}

export interface IAddress {
  id: number;
  street_address: string;
  city: string;
  postal_code: string;
  country: string;
  phone_number: string;
  district_name: string;
}
