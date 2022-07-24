import React, { Fragment, useState } from "react";
import Loader from "../../components/Loader";
import moment from "moment";
import { Menu, Transition } from "@headlessui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiFillCrown } from "react-icons/ai";
import { Link } from "react-router-dom";
import Modal from "../../components/Modal";
import { useContent } from "../../context/ContentContext";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const AllDocs = ({ loading, data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [docId, setDocId] = useState("");
  const { DeleteDocs } = useContent();
  const { user } = useAuth();

  const handleDelete = async (docId) => {
    try {
      const res = await DeleteDocs(docId);
      if (res.status == 401) {
        toast.error(res.data.message);
      } else {
        toast.success("Document deleted successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center mt-8">
        <Loader color="black" />
      </div>
    );
  }

  return (
    <div className="mt-6 flex md:flex-row flex-col  flex-wrap">
      <Toaster />
      {data.length > 0 ? (
        data.map((doc) => {
          return (
            <div
              key={doc._id}
              className="w-60 py-3 border m-3 rounded-xl border-gray-400 hover:border-gray-800"
            >
              <Modal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                docId={docId}
                hash={doc.transactionhash[0]}
                isTokenCreated={doc.isTokenCreated}
              />
              <div className="border-b border-gray-400 w-full h-36 flex justify-center items-center relative">
                <img src="https://img.icons8.com/fluency/96/000000/new-document.png" />
                {user?._id == doc.docsOwner && (
                  <AiFillCrown className="absolute left-2 top-0 text-2xl" />
                )}
                <Menu
                  as="div"
                  className="absolute right-4 top-0 inline-block text-left"
                >
                  <div>
                    <Menu.Button className="">
                      <BsThreeDotsVertical className="text-gray-800 text-xl" />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute px-1 py-1 right-0 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => {
                              setIsOpen(true);
                              setDocId(doc._id);
                            }}
                            className={`${
                              active
                                ? "bg-gray-500 text-white"
                                : "text-gray-900"
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            Add Collaborator
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to={`/doc/${doc.metaUri.split("//")[1]}`}
                            className={`${
                              active
                                ? "bg-gray-500 text-white"
                                : "text-gray-900"
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            View
                          </Link>
                        )}
                      </Menu.Item>

                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to={`/doc/edit/${doc.metaUri.split("//")[1]}`}
                            className={`${
                              active
                                ? "bg-gray-500 text-white"
                                : "text-gray-900"
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            Edit
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => handleDelete(doc._id)}
                            className={`${
                              active
                                ? "bg-gray-500 text-white"
                                : "text-gray-900"
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            Remove
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>

              <div className="px-3 pt-2">
                <p className="font-bold truncate text-gray-800 text-lg">
                  {doc.title}
                </p>
                <p className="text-xs text-gray-600 font-medium">
                  {moment(doc.createdAt).format("MMM DD YYYY")}
                </p>
                <div className="flex mt-3 mx-2">
                  {doc?.collaborators?.length > 0 ? (
                    doc?.collaborators.map((collaborator, i) => (
                      <div key={i} className="-ml-2">
                        <img
                          src={collaborator.avatar}
                          alt="avi"
                          className="w-6 h-6 rounded-full border border-gray-400 bg-white"
                        />
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600 text-sm">No collaborators</p>
                  )}
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-center text-sm mt-10 text-gray-800">No docs found</p>
      )}
    </div>
  );
};

export default AllDocs;
