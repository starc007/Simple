import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContent } from "../../context/ContentContext";
import AllDocs from "./AllDocs";

const CreateDocs = () => {
  const navigate = useNavigate();
  const { GetDocs, loading, docs } = useContent();

  useEffect(() => {
    GetDocs();
  }, []);

  return (
    <div className="mt-2">
      <p className="text-xl font-medium">Start a New Doc</p>
      <div className="w-48 h-48 mt-4">
        <button
          onClick={() => navigate("/doc/create")}
          className="border border-gray-500 rounded-xl w-full h-full text-6xl text-gray-600 font-medium"
        >
          +
        </button>
      </div>
      <p className="text-xl font-medium mt-5">Recent Docs</p>
      <AllDocs loading={loading} data={docs} />
    </div>
  );
};

export default CreateDocs;
