import { LoginTS, RegisterTs } from "../../types";

export type UserTS = {
  username: string;
  email: string;
  isAdmin: boolean;
};

export type AuthContTS = {
  user: UserTS;
  registerHanlder: (data: RegisterTs) => Promise<void>;
  loginHanlder: (data: LoginTS) => Promise<void>;
  logoutHanlder: () => Promise<void>;
  userProfile: () => Promise<void>;
};
