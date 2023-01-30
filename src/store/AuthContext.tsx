import { createContext, ReactNode, useState } from "react";

interface AuthContextData {
  userData: {
    name: string,
    email: string,
    password: string,
  };
}

const AuthContext = createContext({} as AuthContextData);

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [userData, setUserData] = useState({ 
    name: "John Doe",
    email: "johndoe@gmail.com",
    password: "123"
  })

  return (
    <AuthContext.Provider value={{ userData }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }