import React, { useEffect, useState } from "react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import toast, { Toaster } from "react-hot-toast";
import { useContent } from "../../context/ContentContext";
import Loader from "../../components/Loader";
import { useParams } from "react-router-dom";
const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "code-block",
];
const EditDocs = () => {
  //   const [formData, setFormData] = useState({});
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { hash } = useParams();
  const [loading, setLoading] = useState(false);
  const { UpdateDoc } = useContent();
  const fetchipfsData = async (hash) => {
    const url = `https://ipfs.io/ipfs/${hash}`;
    const res = await fetch(url);
    const data = await res.json();
    setName(data.name);
    setDescription(data.description);
  };

  useEffect(() => {
    fetchipfsData(hash);
  }, [hash]);

  //   console.log(data);

  const handleSubmit = async () => {
    console.log(name, description);
    if (!name || !description) {
      toast.error("Please fill all the fields");
      return;
    }
    setLoading(true);
    const res = await UpdateDoc(
      {
        name,
        description,
      },
      hash
    );
    if (res) {
      toast.success("NFT updated successfully");
      setTimeout(() => {
        window.location.href = "/doc";
      }, 600);
    }
  };

  return (
    <div className="mt-2 w-full">
      <Toaster />
      <div className="flex justify-between w-full my-4">
        <div></div>
        <div className="flex space-x-4">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-20 h-10 bg-gray-800 text-white rounded-xl text-sm font-medium flex justify-center items-center"
          >
            {loading ? <Loader /> : "Update"}
          </button>
        </div>
      </div>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Give it a title..."
        className=" text-gray-700 px-3 w-full h-16 mb-4 text-3xl md:text-4xl font-medium focus:outline-none bg-transparent "
      />
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        value={description}
        placeholder="Lets write an awesome story!........."
        onChange={setDescription}
      />
    </div>
  );
};

export default EditDocs;
