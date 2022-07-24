import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ethers } from "ethers";
import { useContent } from "../context/ContentContext";
import Loader from "./Loader";
import toast, { Toaster } from "react-hot-toast";
import ABI from "../ABI.json";
import nftABi from "../mynftABI.json";

const CONTRACT_ADDRESS = "0x72d049c50941b267A282fC9031A1dedCE7414A85";

const Modal = ({ isOpen, setIsOpen, docId, hash, isTokenCreated }) => {
  const [address, setAddress] = useState("");
  const { AddCollaboratorToDocs, GetUser, GetToken } = useContent();
  const [loading, setLoading] = useState(false);

  const createToken = async (tokenID) => {
    const COLLECTION_ADDRESS = "0xC497beD9692Babe5E2fEd96373D2fe82FB89C913";
    const nft_contract = "0x1ba6b7b81f1ae7931247c5acf60ec5ce4061c586";
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
    // const tx1 = await contract.setApprovalForAll(nft_contract, true);
    // const tx = await contract.initialize(nft_contract, 1, 10000);
    // await tx.wait();
    // return true;
    // // const tx = await contract.safeMint(
    // //   "0x3514a3c62d6ea657d4ec47eac0bb6858c04aa2d9",
    // //   1
    // // );
    // // await tx.wait();
    try {
      const res = await provider.getBalance(
        "0x3514a3C62d6ea657D4Ec47EaC0Bb6858c04Aa2D9"
      );
      let balance = ethers.utils.formatEther(res);
      console.log(balance);
    } catch (err) {
      console.log(err);
    }
    // const tx2 = await contract.intialize(coll);
  };

  const handleSubmit = async () => {
    if (!address) {
      toast.error("Please enter an address");
      return;
    }
    const resdata = await GetToken(hash);
    console.log("res", resdata);
    const tokenID = await createToken(resdata.token_id);
    // setLoading(true);
    // const userdata = await GetUser({
    //   wallet_address: address.toLowerCase(),
    // });
    // const data = {
    //   docId,
    //   collabId: userdata._id,
    // };
    // const res = await AddCollaboratorToDocs(data);
    // if (res.status == 200) {
    //   toast.success("Collaborator added!!");
    //   setAddress("");
    //   setIsOpen(false);
    //   setLoading(false);
    // } else if (res.status == 401) {
    //   toast.error(res.data.message);
    //   setLoading(false);
    // }
    // setLoading(false);
  };
  return (
    <>
      <Toaster />
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Add Collaborator
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Enter the wallet address of the collaborator to request
                      for Collaboration
                    </p>
                    <input
                      type="text"
                      onChange={(e) => setAddress(e.target.value)}
                      value={address}
                      placeholder="0x..."
                      className="w-full px-4 py-2 border mt-3 text-sm leading-5 border-gray-300 rounded-md focus:outline-none focus:ring-gray-800 focus:ring-1 transition duration-150 ease-in-out"
                    />
                  </div>

                  <div className="mt-4 flex space-x-4">
                    <button
                      className="flex justify-center items-center rounded-md bg-gray-200 w-20 h-10 font-medium text-gray-600 focus:outline-none"
                      onClick={() => setIsOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="flex justify-center items-center rounded-md bg-gray-800 w-20 h-10 font-medium text-white focus:outline-none"
                      onClick={handleSubmit}
                      disabled={loading}
                    >
                      {loading ? <Loader /> : "Add"}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modal;
