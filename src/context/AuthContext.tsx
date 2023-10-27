"use client";
import {
  useState,
  useEffect,
  createContext,
  ReactNode,
  useContext,
} from "react";
import { toast } from "react-toastify";

export type TodoContextType = {
  isAuth: boolean;
  token: string;
  setToken: any;
  Login: () => void;
  Logout: () => void;
};

export const AuthenticationContext = createContext<TodoContextType | null>(
  null
);

export const AuthenticationProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState("");

  const Login = () => {
    setIsAuth(true);
  };

  const Logout = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/logout`,
      {
        method: "GET",
        headers: { "content-type": "application/json" },
        credentials: "include",
      }
    );
    const result = await res.json();
    if (result.success === true) {
      setIsAuth(false);
      toast.success("Logout Successfully");
    }
  };

  const AuthMe = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/me`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        cookie: `token=${token}`,
      },
    });
    const result = await res.json();
    if (result.success === true) {
      Login();
    }
  };

  useEffect(() => {
    AuthMe();
  }, []);

  return (
    <AuthenticationContext.Provider value={{ isAuth, Login, Logout, token, setToken }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthenticationContext);
  if (context === undefined) {
    throw new Error(
      "AuthenticationContext must be used within a AuthenticationProvider"
    );
  }
  return context;
};
