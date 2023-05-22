import {
  useState,
  useContext,
  useEffect,
} from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { api } from "../ServicesApi/funcionarioApi";
import {
  AppContext,
} from "../Context/FuncionarioProvider";
import IFuncioanario from "../helpers/interfaces/interface";
import React from "react";
import { validateCpf, validateDtaNascimento } from "../utils/regex";

interface FormValues extends IFuncioanario {}

export function ModalCadastroFuncionario() {
  const [showModal, setShowModal] = React.useState(false);
  const { register, handleSubmit, reset } = useForm();
  const { funcionario, setFuncionario, allFuncionarios } =
    useContext(AppContext);
  const [emailErr, setemailErr] = useState<boolean>(false);
  const [cpfErr, setCpfErr] = useState<boolean>(false);



  const handleSubmitPost: SubmitHandler<any> = async (data: IFuncioanario) => {
    // validateInput(data);
    if (!validateCpf.test(data.cpf as unknown as string)) {
      setCpfErr(true);
      alert('Formato Cpf invalido: (000.000.000.00)')
      setShowModal(true);
    } else {
      setCpfErr(false);
      setShowModal(false);
      await api.post("funcionarios", data);
    }


    setFuncionario(funcionario.filter((del) => del._id !== data._id));
    reset();
  };

  useEffect(() => {
    handleSubmit
  }, [allFuncionarios]);

  return (
    <>
      <button
        className="bg-gray-400  text-white active:bg-emerald-600 font-bold uppercase text-sm px-1 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="submit"
        onClick={() => setShowModal(true)}
      >
        Cadastrar Novo
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold    uppercase   w-full text-center">
                      Novo Funcionario
                    </h3>
                  </div>
                </div>
                <div className=" bg-gray-200 w-full divide-y divide-gray-200 table-layout: auto">
                  <form onSubmit={handleSubmit(handleSubmitPost)}>
                    <div className="mt-6">
                      <div className=" bg-gray-200 w-full divide-y divide-gray-200 table-layout: auto">
                        <div className="  px-2 py-3 text-left text-xs font-medium text-grady-500 uppercase track-wider">
                          <input
                            className="px-6 py-3 text-grady-500  track-wider   text-xs font-medium text-grady-500 uppercase track-wider w-full text-center"
                            type=""
                            id="fname"
                            placeholder="Digite o Cpf"
                            {...register("cpf")}
                          />
                          {/* {cpfErr && (
                            <p>Formato Cpf invalido: (000.000.000.00)</p>
                          )} */}
                        </div>
                        <div className="  px-2 py-3 text-left text-xs font-medium text-grady-500 uppercase track-wider">
                          <input
                            className="px-6 py-3 text-grady-500  track-wider   text-xs font-medium text-grady-500 uppercase track-wider w-full text-center"
                            type="text"
                            id="fname"
                            placeholder="Digite o nome"
                            {...register("nome")}
                          />
                        </div>
                        <div className="  px-2 py-3 text-left text-xs font-medium text-grady-500 uppercase track-wider">
                          <input
                            className="px-6 py-3 text-grady-500  track-wider   text-xs font-medium text-grady-500 uppercase track-wider w-full text-center"
                            type="text"
                            id="fname"
                            placeholder="Digite o Salario"
                            {...register("salario")}
                          />
                        </div>

                        <div className="  px-2 py-3 text-left text-xs font-medium text-grady-500 uppercase track-wider">
                          <input
                            className="px-6 py-3 text-grady-500  track-wider   text-xs font-medium text-grady-500 uppercase track-wider w-full text-center"
                            type="text"
                            id="fname"
                            placeholder="Digite o Departamento"
                            {...register("departamento")}
                          />
                        </div>

                        <div className="  px-2 py-3 text-left text-xs font-medium text-grady-500 uppercase track-wider">
                          <input
                            className="px-6 py-3 text-grady-500  track-wider   text-xs font-medium text-grady-500 uppercase track-wider w-full text-center"
                            type="date"
                            id="fname"
                            placeholder="Digite a Data de nascimento"
                            {...register("data_nascimento")}
                          />
                          {emailErr && (
                            <p>Forrmato Data Nascimento invalido: (DD/MM/AA)</p>
                          )}
                        </div>

                        <div className="container flex items-center justify-center">
                          <button
                            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-7 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="submit"
                          >
                            Salvar e sair
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                  <div className="container flex items-center justify-center">
                    <button
                      className="bg-red-500  text-white  active:bg-emerald-600 font-bold uppercase text-sm px-4 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Sair sem salvar
                    </button>
                  </div>
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
