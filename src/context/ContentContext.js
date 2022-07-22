import React, { useContext, useState, createContext } from "react";
import {
  CreateDoc,
  getDocs,
  AddCollaborator,
  getUserFromWallet,
  UpdateDocs,
  DeleteDoc,
} from "../api/index";
const ContentContext = createContext();
export function useContent() {
  return useContext(ContentContext);
}

export function ContentProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [docs, setDocs] = useState([]);

  const CreateDocs = async (metadata) => {
    setLoading(true);
    try {
      const { data } = await CreateDoc(metadata);
      setLoading(false);
      setDocs([data.data, ...docs]);
      return true;
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const GetDocs = async () => {
    setLoading(true);
    try {
      const { data } = await getDocs();
      setLoading(false);
      setDocs(data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const AddCollaboratorToDocs = async (collabData) => {
    try {
      const res = await AddCollaborator(collabData);
      return res;
    } catch (error) {
      console.log(error);
      return error.response;
    }
  };

  const GetUser = async (wallet) => {
    try {
      const { data } = await getUserFromWallet(wallet);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const UpdateDoc = async (metadata, hash) => {
    try {
      await UpdateDocs(metadata, hash);
      return true;
    } catch (error) {
      console.log(error);
    }
  };
  const DeleteDocs = async (docId) => {
    try {
      const res = await DeleteDoc(docId);
      return res;
    } catch (error) {
      return error.response;
    }
  };
  const value = {
    CreateDocs,
    loading,
    GetDocs,
    docs,
    AddCollaboratorToDocs,
    GetUser,
    UpdateDoc,
    DeleteDocs,
  };
  return (
    <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
  );
}
