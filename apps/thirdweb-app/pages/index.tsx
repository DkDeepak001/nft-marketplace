import {
  ThirdwebNftMedia,
  useContract,
  useNFT,
  useNFTs,
} from "@thirdweb-dev/react";
import type { NextPage } from "next";
import { Header } from "../components/header";

const CONTRACT_ADDRESS = "0xa853c7e388900046392b7C11Af1836FE09699180";

const Home: NextPage = () => {
  const { contract } = useContract(CONTRACT_ADDRESS);

  const { data } = useNFTs(contract);

  // console.log(data);
  return (
    <div className="bg-brand-primary  h-full px-32 items-center">
      <Header />
      <div className="border-b-2 border-slate-300/25  w-full mb-10 mt-3" />
      <div className="flex flex-row flex-wrap gap-8 justify-center">
        {data?.map((item) => (
          <div className="border-2 border-slate-300 rounded-lg  p-4">
            <ThirdwebNftMedia
              metadata={item?.metadata}
              width="75"
              height="75"
              className="rounded-lg h-96 w-96"
            />
            <div className="pt-5 flex flex-row justify-between items-center ">
              <div className="flex-col flex ">
                <h4 className="text-slate-300 text-3xl text-extrabold">
                  #{item?.metadata?.id}
                </h4>
                <p className="text-slate-300 text-xl text-extrabold pt-2">
                  {item?.metadata?.name}
                </p>
              </div>
              <button className="bg-slate-300 text-brand-primary rounded-lg w-1/4 h-11  font-medium   tracking-wider hover:bg-slate-100">
                Buy
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
