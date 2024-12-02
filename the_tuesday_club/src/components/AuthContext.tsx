import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type User = {
  isAuthenticated: boolean;
  isSuperuser: boolean;
};

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

type AuthProviderProps = {
  children: ReactNode; // Definer children-typen
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserStatus = async () => {
      const response = await fetch("/api/auth/status");
      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        setUser(null);
      }
    };

    fetchUserStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
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
