import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useContent } from "../context/ContentContext";
import Loader from "./Loader";
import toast, { Toaster } from "react-hot-toast";

const Modal = ({ isOpen, setIsOpen, docId }) => {
  const [address, setAddress] = useState("");
  const { AddCollaboratorToDocs, GetUser } = useContent();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!address) {
      toast.error("Please enter an address");
      return;
    }
    setLoading(true);
    const userdata = await GetUser({
      wallet_address: address.toLowerCase(),
    });
    const data = {
      docId,
      collabId: userdata._id,
      wall_address: address.toLowerCase(),
    };
    const res = await AddCollaboratorToDocs(data);
    if (res.status == 200) {
      toast.success("Collaborator added!!");
      setAddress("");
      setIsOpen(false);
      setLoading(false);
    } else if (res.status == 401) {
      toast.error(res.data.message);
      setLoading(false);
    }
    setLoading(false);
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
