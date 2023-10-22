export interface IUser {
  _id?: string;
  email?: string;
  userName?: string;
  hasVerifiedEmail?: boolean;
  role?: "Admin" | "User";
  avatar?: string;
  phoneNumber?: string;
  location?: string;
  createdAt: string;
  updatedAt: string;
}

//auth slice types
export interface IAuthState {
  isLoggedIn: boolean;
  user: string | null;
  accessToken: string | null;
  refreshToken: string | null;
}

/*auth register type*/
// user register types
export interface IRegister {
  userName: string;
  email: string;
  password: string;
}

export interface IRegisterData {
  user?: IUser | null;

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
  email: string;
  password: string;
}

export interface ILoginData {
  email?: string | null;
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
  id: string;
  userName: string;
  email: string;
  imageUrl: string;
}
