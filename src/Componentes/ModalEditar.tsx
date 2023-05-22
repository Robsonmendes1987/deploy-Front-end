import React from "react";
import { useState } from "react";
import { validateDtaNascimento } from "../utils/regex";
import {
  AppContext,
  FuncionarioProvider,
  UserContextProps,
} from "../Context/FuncionarioProvider";
import { api } from "../ServicesApi/funcionarioApi";
import IFuncioanario from "../helpers/interfaces/interface";

export function ModalEditar({Funcionario}: any) {
  const [showModal, setShowModal] = React.useState(false);
  const [NascikmentErr, setNascikmentErr] = useState<boolean>(false);
  const [cpfErr, setCpfErr] = useState<boolean>(false);

  const validateInput = () => {
    if (!validateDtaNascimento.test(Funcionario.data_nascimento)) {
      setNascikmentErr(true);
    } else {
      setNascikmentErr(false);
    }
  };

  function changeNome(event: any) {
    const novoNome = event.target.value;
    Funcionario.nome = novoNome;
  }

  function changeSAlario(event: any) {
    const novoNome = event.target.value;
    Funcionario.salario = novoNome;
  }

  function changeDepartamento(event: any) {
    const novoNome = event.target.value;
    Funcionario.departamento = novoNome;
  }

  function changeDataNascimento(event: any) {
    const novoNome = event.target.value;
    Funcionario.data_nascimento = novoNome;
  }

  const handleSubmitPut = async (formData: IFuncioanario) => {
    console.log("FORMDATA", formData);

    await api.patch(`/funcionarios/${Funcionario.id}`, formData);
    console.log("FUNCIONARIO DA FUNÇAO", Funcionario.id);
    setShowModal(false);
  };

  return (
    <>
      <button
        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-1 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        EDITAR NOVO
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Editar Funcionario</h3>
                </div>
                {/*body*/}
                <div className=" bg-gray-200 w-full divide-y divide-gray-200 table-layout: auto">
                  <header>
                    <form onChange={validateInput} name="meuFormulario">
                      <div className="mt-6">
                        <div>
                          <div className="  px-2 py-3 text-left text-xs font-medium text-grady-500 uppercase track-wider">
                            <div>Nome:</div>

                            <input
                              onChange={changeNome}
                              defaultValue={Funcionario.nome}
                              className="px-6 py-3 text-grady-500  track-wider   text-xs font-medium text-grady-500 uppercase track-wider w-full text-center"
                              type="text"
                              placeholder="Digite o nome"
                            />
                          </div>
                          <div className="  px-2 py-3 text-left text-xs font-medium text-grady-500 uppercase track-wider">
                            <div>Salario:</div>
                            <input
                              onChange={changeSAlario}
                              defaultValue={Funcionario.salario}
                              className="px-6 py-3 text-grady-500  track-wider   text-xs font-medium text-grady-500 uppercase track-wider w-full text-center"
                              type="text"
                              placeholder="Digite o Salario"
                            />
                          </div>

                          <div className="  px-2 py-3 text-left text-xs font-medium text-grady-500 uppercase track-wider">
                            <div>Departamento:</div>
                            <input
                              onChange={changeDepartamento}
                              defaultValue={Funcionario.departamento}
                              className="px-6 py-3 text-grady-500  track-wider   text-xs font-medium text-grady-500 uppercase track-wider w-full text-center"
                              type="text"
                              placeholder="Digite o Departamento"
                            />
                          </div>

                          <div className="  px-2 py-3 text-left text-xs font-medium text-grady-500 uppercase track-wider ">
                            <div>Data Nascimento:</div>

                            <input 
                              onChange={changeDataNascimento}
                              defaultValue={Funcionario.data_nascimento}
                              className="px-6 py-3  text-xs font-medium text-grady-500 uppercase track-wider w-full text-center" 
                              type="text"
                              placeholder="Digite a Data de nascimento"
                            />
                          </div>
                          {NascikmentErr && <p>Formato invalido (DD/MM/AA)</p>}
                        </div>
                      </div>
                      <div className="container flex items-center justify-center">

                      <button 
                        onClick={() => handleSubmitPut(Funcionario)}
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-7 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="submit"
                      >
                        Salvar Alteraçoes
                      </button>
                        
                      </div>
                    </form>
                    <div className="container flex items-center justify-center">
                    <button
                      className="bg-red-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-20 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="submit"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>

                    </div>


                  </header>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b"></div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
