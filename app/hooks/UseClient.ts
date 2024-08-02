import { useEffect, useState } from "react";

import { Client } from "../core/ClientRepository";

import {
  collection,
  getDocs,
  deleteDoc,
  updateDoc,
  addDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase/config";

type AddOrEditProps = {
  action: string;
  name: string;
  setName: (e: string) => void;
  age: string;
  setAge: (e: string) => void;
  idEdit: string;
  setStateShowForm: (e: boolean) => void;
  attDocs: () => void;
};

export default function UseClient() {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    getAllDocuments();
  }, []);

  async function getAllDocuments() {
    const docRef = collection(db, "clients");

    await getDocs(docRef)
      .then((snapshot) => {
        let listTemp: Client[] = [];

        snapshot.forEach((doc) => {
          listTemp.push({
            id: doc.id,
            name: doc.data().name,
            age: doc.data().age,
          });
        });

        setClients(listTemp);
      })
      .catch((error) => console.log(error));
  }

  async function handleDelete(id: string) {
    const docRef = doc(db, "clients", id);

    await deleteDoc(docRef).then((e) => {
      alert("Cliente deletado");
      getAllDocuments();
    });
  }

  async function handleAddOrEdit({
    action,
    name,
    setName,
    age,
    setAge,
    idEdit,
    setStateShowForm,
    attDocs,
  }: AddOrEditProps) {
    if (name !== "" && age !== "") {
      if (action === "add") {
        await addDoc(collection(db, "clients"), {
          name: name,
          age: age,
        }).then(() => {
          setName("");
          setAge("");
          setStateShowForm(false);
          attDocs();
        });
      } else {
        const data = { id: idEdit, name: name, age: age };
        const docRef = doc(db, "clients", idEdit);

        await updateDoc(docRef, data).then((e) => {
          setName("");
          setAge("");
          setStateShowForm(false);
          attDocs();
        });
      }
    } else {
      alert("Preencha todos os campos");
    }
  }

  return {
    getAllDocuments,
    handleDelete,
    clients,
    handleAddOrEdit,
  };
}
