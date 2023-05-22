import { useState, useEffect } from "react";

import { api } from "../ServicesApi/funcionarioApi";
import IFuncionario from "../helpers/interfaces/interface";
import React from "react";

type Props = {
  propertyToShow: string;
};

export function FiltroFuncionarios() {
  const [showModal, setShowModal] = React.useState(false);
  const [state, setState] = useState<IFuncionario[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [dataFilter, setDataFilter] = useState<IFuncionario[] | []>([]);
  const [departamento, setDepartamento] = useState<string[] | []>([]);

  const getAllFuncionarios = async () => {
    const result = await api.get("/funcionarios");
    setState(result.data);
    const departamentos = [] as string[];
    result.data.forEach((element: IFuncionario) => {
      if (!departamentos.includes(element.departamento))
        departamentos.push(element.departamento);
      return;
    });
    setDepartamento(departamentos);
  };

  const getFilter = async () => {
    const lowerCase = filter.toLowerCase();
    const filtro = state.filter(
      (element: IFuncionario) =>
        element.nome.toLowerCase().includes(lowerCase) ||
        element.departamento === filter
    );
    if (filtro.length === 0) {
      setErrorMessage("Dado não encontrado");
    } else {
      setErrorMessage("");
    }
    setDataFilter(filtro);
  };

  useEffect(() => {
    getAllFuncionarios();
  }, []);

  return (
    <>
      <input className=""
        value={filter}
        type="text"
        placeholder="Buscar por Nome"
        onChange={(e) => setFilter(e.target.value)}
      />

      <label>
        Departamento:
        <select
          onChange={(e) => setFilter(e.target.value)}
          name="select"
          className="w-30 md:w-60 lg:w-48"
        >
          <option value="">Selecione uma opção</option>
          {departamento.map((element) => (
            <option value={element}>{element}</option>
          ))}
        </select>
      </label>
      <button
        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-1 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => {
          setShowModal(true);
          getFilter();
        }}
      >
        Buscar Funcionario
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Resultado da Busca</h3>
                </div>
                <div className="relative ">
                  <header>
                    <form>
                      <div className="mt-6 ">
                        <ul className="bg-gray-200">
                          {errorMessage && <div>{errorMessage}</div>}
                          {dataFilter.map((element: IFuncionario) => (
                            <div className="relative w-auto my-6 mx-auto  max-w-3xl">
                              <div className="  px-2 py-3 text-left text-xs flex font-medium text-grady-500 uppercase track-wider">
                                <tr key={element._id}>
                                  <td className=" px-6 py-3 text-left text-xs font-medium text-grady-500 uppercase track-wider">
                                    <th className=" bg-gray-200 px-10 py-3 text-left text-xs font-medium text-grady-500 uppercase track-wider">
                                      Nome:
                                    </th>

                                    <div className="px-10 py-3 text-left text-xs font-medium text-grady-500 uppercase track-wider">
                                      <td>{element.nome}</td>
                                    </div>
                                  </td>

                                  <td className="px-6 py-3 text-left text-xs font-medium text-grady-500 uppercase track-wider">
                                    <th className=" bg-gray-200 px-10 py-3 text-left text-xs font-medium text-grady-500 uppercase track-wider">
                                      Salario:
                                    </th>
                                    <div className="px-10 py-3 text-left text-xs font-medium text-grady-500 uppercase track-wider">
                                      {element.salario}
                                    </div>
                                  </td>
                                  <td className="px-6 py-3 text-left text-xs font-medium text-grady-500 uppercase track-wider">
                                    <th className=" bg-gray-200 px-0 py-2 text-left text-xs font-medium text-grady-500 uppercase track-wider">
                                      Departamento:
                                    </th>
                                    <div className="px-10 py-3 text-left text-xs font-medium text-grady-500 uppercase track-wider">
                                      {element.departamento}
                                    </div>
                                  </td>
                                  <td className="px-0 py-3  text-left text-xs font-medium text-grady-500 uppercase track-wider">
                                    <th className=" bg-gray-200 px-0 py-2 text-left text-xs font-medium text-grady-500 uppercase track-wider">
                                      Data De Nascimento:
                                    </th>
                                    <div className="px-10 py-3 text-left text-xs font-medium text-grady-500 uppercase track-wider">
                                      {element.data_nascimento}
                                    </div>
                                  </td>
                                </tr>
                              </div>
                            </div>
                          ))}
                        </ul>
                      </div>
                    </form>
                  </header>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
