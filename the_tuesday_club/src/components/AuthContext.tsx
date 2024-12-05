import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import apiClientWhitCredentials from "../services/api-client-whit-credentials";


type User = {
  username: string;
  isAuthenticated: boolean;
  isSuperuser: boolean;
};

type AuthContextType = {
  user: User | null;
  login: (credentials: { username: string; password: string }) => Promise<any>;
  logout: () => Promise<any>;
  isLoginLoading: boolean;
  loginError: any;
  isLogoutLoading: boolean;
  logoutError: any;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<any>(null);
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);
  const [logoutError, setLogoutError] = useState<any>(null);

  // Hent brugerdata ved første indlæsning
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await apiClientWhitCredentials.get("/api/users/me");
        setUser(response.data);
      } catch {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const login = async (credentials: { username: string; password: string }) => {
    setIsLoginLoading(true);
    setLoginError(null);

    try {
      const response = await apiClientWhitCredentials.post("/api/users/login", credentials);
      // Efter login, hent brugerdata
      const userResponse = await apiClientWhitCredentials.get("/api/users/me");
      setUser(userResponse.data);
      return null;
    } catch (error: any) {
      setLoginError(error.response?.data || { message: "Unknown error occurred" });
      return error.response?.data || { message: "Unknown error occurred" };
    } finally {
      setIsLoginLoading(false);
    }
  };

  const logout = async () => {
    setIsLogoutLoading(true);
    setLogoutError(null);

    try {
      await apiClientWhitCredentials.post("/api/users/logout", {});
      setUser(null);
      return null;
    } catch (error: any) {
      setLogoutError(error.response?.data || { message: "Unknown error occurred" });
      return error.response?.data || { message: "Unknown error occurred" };
    } finally {
      setIsLogoutLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isLoginLoading,
        loginError,
        isLogoutLoading,
        logoutError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
