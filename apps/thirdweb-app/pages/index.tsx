import { useActiveListings, useContract } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import Header from "../components/header";
import CardSkeleton from "../components/skeleton/card";
import Card from "../components/card/card";

const MARKET_PLACE_ADDRESS = "0x53E5eF7824d694b68A04C9458e51e7460e64b36e";

const Home: NextPage = () => {
  const { contract } = useContract(MARKET_PLACE_ADDRESS, "marketplace");

  const { data: nfts, isLoading } = useActiveListings(contract);
  // const { data: nfts, isLoading } = useNFTs(contract);

  // console.log(data);
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
          nfts?.map((item) => <Card item={item} contract={contract} />)
        )}
      </div>
    </div>
  );
};

export default Home;
