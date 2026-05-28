import { createContext, useContext, useState } from "react";

type AuthContextType = {
    token: string | null;
    isLoggedIn: boolean;
    login: (token: string) => void; 
    logout: () => void; 
};

const AuthContext = createContext<AuthContextType | undefined>(undefined); 

export function AuthProvider({ children }: {children: React.ReactNode}) {
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

    function login(newToken: string) {
        localStorage.setItem("token", newToken); 
        setToken(newToken); 
    }

    function logout() {
        localStorage.removeItem("token");
        setToken(null);
    }

    return (
    <AuthContext.Provider
      value={{
        token,
        isLoggedIn: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth måste användas inuti AuthProvider");
  }

  return context;
}
