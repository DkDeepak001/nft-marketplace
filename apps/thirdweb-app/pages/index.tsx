import { useContract, useNFTs } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import Header from "../components/header";
import CardSkeleton from "../components/skeleton/card";
import Card from "../components/card/card";
import { COLLECTION_ADDRESS, MARKET_PLACE_ADDRESS } from "./address";

const Home: NextPage = () => {
  const { contract } = useContract(COLLECTION_ADDRESS);
  const { data: nfts, isLoading } = useNFTs(contract);

  return (
    <div className="bg-brand-primary  max-h-full min-h-screen  px-32 items-center">
      <Header />
      <div className="border-b-2 border-slate-300/25  w-full mb-10 mt-3" />
      <div className="flex flex-row flex-wrap gap-8 justify-center pb-16">
        {isLoading ? (
          <CardSkeleton />
        ) : nfts?.length === 0 ? (
          <h1 className="text-white text-3xl">
            No NFT's available for listing
          </h1>
        ) : (
          nfts?.map((item) => <Card item={item} id={item.metadata.id} />)
        )}
      </div>
    </div>
  );
};

export default Home;
