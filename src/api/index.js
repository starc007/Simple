import axios from "axios";

const URL = "http://localhost:5000/api/v1";
// const URL = "https://simple-server-psi.vercel.app/api/v1";

const API = axios.create({
  baseURL: URL,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("Stoken");
  config.headers.Authorization = token ? `Stoken ${token}` : "";
  return config;
});

export const Login = (data) => axios.post(`${URL}/login`, data);
export const getProfile = () => API.get("/get-user");
export const CreateDoc = (data) => API.post("/mint-nft", data);
export const getDocs = () => API.get("/get-user-nfts");

export const getNftbyHash = (hash) =>
  axios.get(`${URL}/get-nft-by-hash/${hash}`);

export const getUserFromWallet = (wallet) =>
  API.post("/get-user-from-wallet", wallet);
export const AddCollaborator = (data) => API.post("/add-collaborator", data);
export const UpdateDocs = (data, hash) => API.post(`/update-nft/${hash}`, data);
export const DeleteDoc = (docId) => API.delete(`/delete-nft/${docId}`);
export const getTokenID = (hash) => API.get(`/tokenid/${hash}`);
