"use client";

import Button from "./Button";
import Input from "./Input";
import UseClient from "../hooks/UseClient";
import { useState, ChangeEvent, FormEvent } from "react";

type FormProps = {
  title: string;
  nameEdit?: string;
  idEdit: string;
  ageEdit?: string;
  textButton: string;
  action: string;
  setStateShowForm: (e: boolean) => void;
  attDocs: () => void;
};

export default function Form({
  title,
  nameEdit,
  idEdit,
  ageEdit,
  textButton,
  action,
  setStateShowForm,
  attDocs,
}: FormProps) {
  const [name, setName] = useState<string>(nameEdit ? nameEdit : "");
  const [age, setAge] = useState<string>(ageEdit ? ageEdit.toString() : "");

  const { handleAddOrEdit } = UseClient();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    handleAddOrEdit({
      action,
      name,
      setName,
      age,
      setAge,
      idEdit,
      setStateShowForm,
      attDocs,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-slate-900 flex flex-col justify-center items-center py-8`}
    >
      <h2 className={`text-2xl mb-4`}>{title}</h2>
      <Input
        type="text"
        placeholder="Digite o nome"
        onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        value={name}
      />
      <Input
        type="number"
        placeholder="Digite a idade"
        onChange={(e: ChangeEvent<HTMLInputElement>) => setAge(e.target.value)}
        value={age}
      />
      <Button name={textButton} type="submit" />
    </form>
  );
}
