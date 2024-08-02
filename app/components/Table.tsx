"use client";

import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Client } from "../core/ClientRepository";

import { useState } from "react";
import Form from "./Form";
import Button from "./Button";
import UseClient from "../hooks/UseClient";

type EditProps = {
  action: "add" | "edit";
  client?: Client;
};

export default function Table() {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [actionForm, setActionForm] = useState<string>("");
  const [nameEdit, setNameEdit] = useState<string>("");
  const [idEdit, setIdEdit] = useState<string>("");
  const [ageEdit, setAgeEdit] = useState<string>("");

  const { getAllDocuments, handleDelete, clients } = UseClient();

  function RenderTHead() {
    return (
      <div className={`grid grid-cols-6 bg-indigo-900 py-4 px-2 text-white`}>
        <div className={` col-span-2`}>Código</div>
        <div className={` col-span-2`}>Nome</div>
        <div className={` col-span-1`}>Idade</div>
        <div className={`text-center col-span-1`}>Ações</div>
      </div>
    );
  }

  function RenderTBody() {
    return clients.map((client, i) => {
      return (
        <div
          key={client.id}
          className={`grid grid-cols-6 bg-slate-800 p-2 text-center text-slate-200`}
        >
          <div className={`text-left col-span-2`}>{client.id}</div>
          <div className={`text-left col-span-2`}>{client.name}</div>
          <div className={`text-left col-span-1`}>{client.age}</div>
          {RenderActions(client)}
        </div>
      );
    });
  }

  function handleShowForm({ action, client }: EditProps) {
    if (action === "add") {
      setActionForm(action);
      setShowForm(!showForm);
      setNameEdit("");
      setAgeEdit("");
    } else {
      setActionForm(action);
      setShowForm(!showForm);
      setNameEdit(client ? client.name : "");
      setAgeEdit(client ? client.age : "");
      setIdEdit(client ? client.id : "");
    }
  }

  function RenderActions(client: Client) {
    return (
      <div className={`flex justify-around col-span-1`}>
        <button
          onClick={() => handleDelete(client.id)}
          className={`flex justify-center items-center text-red-400 rounded-full  hover:bg-slate-400 p-2`}
        >
          <MdDelete />
        </button>

        <button
          onClick={() => handleShowForm({ action: "edit", client: client })}
          className={`flex justify-center items-center text-green-300 rounded-full  hover:bg-slate-400 p-2`}
        >
          <FaEdit />
        </button>
      </div>
    );
  }

  return (
    <div className={``}>
      <div
        className="flex justify-end mb-4"
        onClick={() => handleShowForm({ action: "add" })}
      >
        <Button name={showForm ? "Fechar" : "Adicionar"} />
      </div>
      {showForm ? (
        <Form
          nameEdit={nameEdit}
          ageEdit={ageEdit}
          idEdit={idEdit}
          title={
            actionForm === "add" ? "Adicionar novo Cliente" : "Editar Cliente"
          }
          textButton={actionForm === "add" ? "Adicionar" : "Editar"}
          action={actionForm}
          setStateShowForm={setShowForm}
          attDocs={getAllDocuments}
        />
      ) : (
        <>
          {RenderTHead()}
          {RenderTBody()}
        </>
      )}
    </div>
  );
}
