import {useContext} from "react";


import {
  AppContext,
  FuncionarioProvider,
  UserContextProps,
} from "../Context/FuncionarioProvider";
import { ModalCadastroFuncionario } from "../Componentes/ModalCadastroFuncionario";
import { ModalDeleteFuncionarios } from "../Componentes/ModalDeleteFuncionarios";
import { FiltroFuncionarios } from "../Componentes/FiltroFuncionarios";
import { ModalEditar } from "../Componentes/ModalEditar";

export function GetApiFuncionarios() {
  const { funcionario } = useContext(AppContext);

  return (
    <div className="padding-left: 8px">
      <FiltroFuncionarios />
      <form>
        <div className="mt-6">
          <table className=" bg-gray-200 w-full divide-y divide-gray-200 table-layout: auto  text-center">
            <thead>
              <tr>
                <th className="px-10 py-3 text-left text-xs font-medium text-grady-500 uppercase track-wider ">
                  Nome
                </th>
                <th className="px-10 py-3 text-left text-xs font-medium text-grady-500 uppercase track-wider">
                  Salario
                </th>
                <th className="px-10 py-3 text-left text-xs font-medium text-grady-500 uppercase track-wider">
                  Departamento
                </th>
                <th className="px-20 py-3 -indent-5 text-left text-xs font-medium text-grady-500 uppercase track-wider">
                  Data de nascimento
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-300">
              {funcionario.map((element) => (
                <tr key={element._id}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                    {element.nome}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                    {element.salario}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                    {element.departamento}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                    {element.data_nascimento}
                  </td>
                  <td>
                    <ModalEditar Funcionario={element} />{" "}
                  </td>
                  <td>
                    <ModalDeleteFuncionarios Funcionario={element} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </form>
      <ModalCadastroFuncionario />
    </div>
  );
}
