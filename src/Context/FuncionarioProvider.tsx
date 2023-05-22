import { useState, ReactNode, createContext } from "react";
import { useEffect } from "react";
import { api } from "../ServicesApi/funcionarioApi";
import IFuncioanario from "../helpers/interfaces/interface";

export interface UserContextProps {
  children: ReactNode;
}

type userContextType = {
  funcionario: IFuncioanario[];
  setFuncionario: any;
  allFuncionarios: any;
};

export const AppContext = createContext({} as userContextType);

export function FuncionarioProvider({ children }: UserContextProps) {
  const [funcionario, setFuncionario] = useState<IFuncioanario[]>([]);

  const allFuncionarios = async (): Promise<any> => {
    const result = await api.get("/funcionarios");
    setFuncionario(result.data);
  };

  useEffect(() => {
    allFuncionarios();
  }, []);
  return (
    <AppContext.Provider
      value={{ funcionario, setFuncionario, allFuncionarios }}
    >
      {children}
    </AppContext.Provider>
  );
}
