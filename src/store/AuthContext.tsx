import { createContext, ReactNode, useState, useEffect } from "react";
import { api } from "../services";

interface UserData {
  name: string,
  email: string,
  password: string,
}

interface AuthContextData {
  userData: UserData;
  authToken: string;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext({} as AuthContextData);

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [userData, setUserData] = useState({} as UserData)
  const [authToken, setAuthToken] = useState("");

  async function signIn(email: string, password: string) {
    try {
      const response = await api.post("/sessions", { email,password })
      const { token, user } = response.data;

      localStorage.setItem("@rocketnotes:user", JSON.stringify(user));
      localStorage.setItem("@rocketnotes:token", token);

      /* INSERINDO TOKEN NO HEADER DE TODAS AS REQUISIÇÕES */
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setUserData(user);
      setAuthToken(token);

      alert("Usuário logado com sucesso!");

    } catch(error: any) {
      if(error.response) {
        alert(error.response.data.message);
      } else {
        alert("Não foi possível efetuar o login.");
      }
    }
  }

  function signOut() {
    localStorage.removeItem("@rocketnotes:user");
    localStorage.removeItem("@rocketnotes:token");

    setUserData({} as UserData);
  }

  useEffect(() => {
    const user = localStorage.getItem("@rocketnotes:user");
    const token = localStorage.getItem("@rocketnotes:token");

    if(user && token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setUserData(JSON.parse(user));
      setAuthToken(token);
    }
  }, [])

  return (
    <AuthContext.Provider value={{ 
      userData, 
      authToken, 
      signIn,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }