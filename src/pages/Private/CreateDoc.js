import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import toast, { Toaster } from "react-hot-toast";

import { useContent } from "../../context/ContentContext";
import Loader from "../../components/Loader";

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
const CreateDoc = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const { CreateDocs, loading } = useContent();

  const handleSubmit = async () => {
    if (!formData.title || !formData.content) {
      toast.error("Please fill all the fields");
      return;
    }
    const res = await CreateDocs(formData);
    if (res) {
      toast.success("NFT minted successfully");
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
            className="w-20 h-10 bg-gray-800 text-white rounded-xl text-sm font-medium flex justify-center items-center"
          >
            {loading ? <Loader /> : "Create"}
          </button>
        </div>
      </div>

      <input
        type="text"
        required
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        placeholder="Give it a title..."
        className=" text-gray-700 px-3 w-full h-16 mb-4 text-3xl md:text-4xl font-medium focus:outline-none bg-transparent "
      />
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        placeholder="Lets write an awesome story!........."
        onChange={(e) => {
          setFormData({
            ...formData,
            content: e,
          });
        }}
      />
    </div>
  );
};

export default CreateDoc;
