import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { api } from "../ServicesApi/funcionarioApi";
import IFuncioanario from "../helpers/interfaces/interface";
import React from "react";



export function ModalDeleteFuncionarios( {Funcionario}: any ) {
  const [showModal, setShowModal] = React.useState(false);
  const { register, handleSubmit, reset } = useForm();
  const [state, setState] = useState<IFuncioanario[]>([]);

  const deletFuncionario = async (id: number) => {
    await api.delete(`/funcionarios/${Funcionario.id}`);
    setState(state.filter((del: { _id: number }) => del._id !== id));
  };

  return (
    <>
      <button
        className="bg-red-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-1 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Excluir
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Excluir Registro</h3>
                </div>
                <div className="relative p-6 flex-auto">
                  <header>
                    <form
                      onSubmit={handleSubmit(() => deletFuncionario(Funcionario.id))}
                    >
                      <div className="mt-6">
                      <div className=" bg-gray-200 w-full divide-y divide-gray-200 table-layout: auto">

                          <div className="  px-2 py-3 text-left text-xs font-medium text-grady-500 uppercase track-wider">
                            <div>Nome:</div>
                          <input
                            value={Funcionario.nome}
                            className="px-6 py-3 text-grady-500  track-wider   text-xs font-medium text-grady-500 uppercase track-wider w-full text-center"
                            type="text"
                            id="fname"
                            placeholder="Digite o nome"
                          />
                          </div>
                          <div className="  px-2 py-3 text-left text-xs font-medium text-grady-500 uppercase track-wider">
                            <div>Salario:</div>
                          <input
                            value={Funcionario.salario}
                            className="px-6 py-3 text-grady-500  track-wider   text-xs font-medium text-grady-500 uppercase track-wider w-full text-center"
                            type="text"
                            {...register("salario")}
                          />
                          </div>


                          <div className="  px-2 py-3 text-left text-xs font-medium text-grady-500 uppercase track-wider">
                            <div>Departamento:</div>
                          <input
                            value={Funcionario.departamento}
                            className="px-6 py-3 text-grady-500  track-wider   text-xs font-medium text-grady-500 uppercase track-wider w-full text-center"
                            type="text"
                            id="fname"
                            {...register("departamento")}
                          />
                          </div>

                          <div className="  px-2 py-3 text-left text-xs font-medium text-grady-500 uppercase track-wider">
                            <div>Data de Nascimento:</div>
                          <input
                            value={Funcionario.data_nascimento}
                            className="px-6 py-3 text-grady-500  track-wider   text-xs font-medium text-grady-500 uppercase track-wider w-full text-center"
                            type="text"
                            id="fname"
                            {...register("data_nascimento")}
                          />
                          </div>
                        </div>
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
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                    onClick={() => deletFuncionario(Funcionario)}
                  >
                    Excluir?
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
