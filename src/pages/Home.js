import React from "react";

const Text = ({ value }) => (
  <div className="text flex sm:text-7xl text-4xl font-extrabold">
    {value.split("").map((char, i) => (
      <div className="letter" style={{ "--delay": `${i * 0.2}s` }}>
        <span className="source">{char}</span>
        <span className="shadow">{char}</span>
        <span className="overlay">{char}</span>
      </div>
    ))}
  </div>
);

const Home = () => {
  return (
    <div className="mt-8">
      <div className="flex items-center mb-4">
        <Text value="LIQUIDITY" />{" "}
        <span className="sm:text-7xl text-5xl ml-6 font-bold">&</span>
      </div>
      <Text value="COLLABORATION" />
      <p className="sm:text-7xl text-5xl font-bold mt-2 mb-6">
        {" "}
        on Web 3.0 made simple and secure, with
      </p>
      <Text value="NFT's" />
    </div>
  );
};

export default Home;
