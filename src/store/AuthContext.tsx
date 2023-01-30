import { createContext, ReactNode, useState } from "react";
import { api } from "../services";

interface UserData {
  name: string,
  email: string,
  password: string,
}

interface AuthContextData {
  userData: UserData;
  signIn: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext({} as AuthContextData);

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [userData, setUserData] = useState({} as UserData)

  async function signIn(email: string, password: string) {
    try {
      const response = await api.post("/sessions", { email,password })
      const { token, user } = response.data;

      /* INSERINDO TOKEN NO HEADER DE TODAS AS REQUISIÇÕES */
      api.defaults.headers.authorization = `Bearer ${token}`;

      setUserData(user);

      alert("Usuário logado com sucesso!");
      console.log(token, user);
    } catch(error: any) {
      if(error.response) {
        alert(error.response.data.message);
      } else {
        alert("Não foi possível efetuar o login.");
      }
    }
  }

  return (
    <AuthContext.Provider value={{ userData, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }