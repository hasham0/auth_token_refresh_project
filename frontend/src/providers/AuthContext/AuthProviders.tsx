import { ReactNode, createContext, useContext, useState } from "react";
import { AuthContTS, UserTS } from "./AuthContTS";
import axios from "axios";
import { LoginTS, RegisterTs } from "../../types";
import { BASE_URL } from "../../utils/URL";
import { redirect } from "react-router-dom";
type Props = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContTS>({} as AuthContTS);

export default function AuthProviders({ children }: Props) {
  const [user, setUser] = useState<UserTS>({
    username: "",
    email: "",
    isAdmin: false,
  });

  const registerHanlder = async (data: RegisterTs) => {
    console.log("🚀  registerHanlder  data:", data);
    try {
      const responce = await axios.post(`${BASE_URL}/register`, data);
      const resdata = responce.data;
      console.log("🚀  registerHanlder  resdata:", resdata);
    } catch (error) {
      console.log("🚀  registerHanlder  error:", error);
    }
  };

  const loginHanlder = async (data: LoginTS) => {
    try {
      const responce = await axios.post(
        `http://localhost:8000/api/users/login`,
        data
      );
      const resdata = responce.data;
      console.log(responce.headers);
      if (responce.status === 200) {
        redirect("/profile");
      }
    } catch (error) {
      console.log("🚀  loginHanlder  error:", error);
    }
  };

  const userProfile = async () => {
    const userData = localStorage.getItem("userData");
    try {
      if (userData) {
        const data = JSON.parse(userData);
        setUser({
          email: data.email,
          username: data.username,
          isAdmin: data.isAdmin,
        });
      } else {
        const responce = await axios.get(`${BASE_URL}/profile`, {
          withCredentials: true,
        });
        const data = responce.data;
        localStorage.setItem("userData", JSON.stringify(data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logoutHanlder = async () => {
    try {
      const responce = await axios.post(`${BASE_URL}/logout`, {
        withCredentials: true,
      });
      const resdata = responce.data;
      console.log("🚀  registerHanlder  resdata:", resdata);
      localStorage.removeItem("userData");
    } catch (error) {
      console.log("🚀  loginHanlder  error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        registerHanlder,
        loginHanlder,
        logoutHanlder,
        userProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
