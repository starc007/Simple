import React from "react";
import Loader from "../components/Loader";
import { useAuth } from "../context/AuthContext";

const Text = ({ value }) => (
  <div className="text flex sm:text-7xl text-4xl font-extrabold">
    {value.split("").map((char, i) => (
      <div key={i} className="letter" style={{ "--delay": `${i * 0.2}s` }}>
        <span className="source">{char}</span>
        <span className="shadow">{char}</span>
        <span className="overlay">{char}</span>
      </div>
    ))}
  </div>
);

const Home = () => {
  const { login, loading } = useAuth();
  return (
    <div className="mt-8">
      <div className="flex items-center mb-4">
        <Text value="LIQUIDITY" />{" "}
        <span className="sm:text-7xl text-5xl ml-6 font-bold">&</span>
      </div>
      <Text value="COLLABORATION" />
      <p className="sm:text-7xl text-5xl font-bold mt-2 mb-6 text-gray-800">
        {" "}
        on web3 made simple and secure, with
      </p>
      <Text value="NFT's" />
      <div className="mt-8">
        <button
          onClick={login}
          className="w-44 h-14 bg-gray-800 rounded-full font-medium text-white flex justify-center items-center"
        >
          {loading ? <Loader /> : "Try Now"}
        </button>
      </div>
    </div>
  );
};

export default Home;
