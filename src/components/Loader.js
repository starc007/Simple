import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Loader = ({ color }) => {
  return <ClipLoader size={20} color={color ? color : "white"} />;
};

export default Loader;
