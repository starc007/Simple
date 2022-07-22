import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import Loader from "../../components/Loader";
import { getNftbyHash } from "../../api/index";

const ReadDocs = () => {
  const { hash } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [getHashData, setGetHashData] = useState([]);
  const fetchipfsData = async (hash) => {
    setLoading(true);
    const url = `https://ipfs.io/ipfs/${hash}`;
    const res = await fetch(url);
    const data = await res.json();
    setData(data);
    setLoading(false);
  };
  const getArticleHashData = async (hash) => {
    const res = await getNftbyHash(hash);
    setGetHashData(res.data);
  };
  useEffect(() => {
    fetchipfsData(hash);
    getArticleHashData(hash);
    //cancel the effect if hash changes
    return () => {
      setData([]);
      setLoading(false);
      setGetHashData([]);
    };
  }, [hash]);
  return (
    <div>
      {loading ? (
        <div className="flex justify-center mt-20">
          <Loader />
        </div>
      ) : (
        <div className="mt-5 px-24">
          <div>
            <div className="flex space-x-4">
              <img
                src={getHashData?.docsOwner?.avatar}
                alt="avi"
                className="w-11 h-11 rounded-full border border-gray-300"
              />
              <div className="flex flex-col">
                <p className="font-medium w-32 truncate">
                  {getHashData?.docsOwner?.wallet_address}
                </p>
                <p className="text-xs font-medium">
                  {moment(getHashData?.created_at).format("MMMM Do YYYY")}
                </p>
              </div>
            </div>
            <div className="mt-4 flex space-x-8 items-center">
              <p className="font-medium text-lg">
                Collaborator: {getHashData?.collaborators?.length}
              </p>
              <div className="flex">
                {getHashData?.collaborators?.length > 0 &&
                  getHashData?.collaborators.map((collaborator) => (
                    <div className="-ml-2">
                      <img
                        src={collaborator.avatar}
                        alt="avi"
                        className="w-9 h-9 rounded-full border border-gray-400 bg-white"
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="mt-10  flex flex-col">
            <h1 className="text-5xl font-bold">{data.name}</h1>
            <div
              className="mt-5 text-xl w-full"
              dangerouslySetInnerHTML={{
                __html: data.description,
              }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadDocs;
