import {
  MediaRenderer,
  useNetworkMismatch,
  useAddress,
  type NFT,
  useActiveListings,
  useContract,
} from "@thirdweb-dev/react";
import React from "react";
import { BigNumber } from "ethers";
import { toast } from "react-hot-toast";
import { COLLECTION_ADDRESS, MARKET_PLACE_ADDRESS } from "../../pages/address";
import Image from "next/image";

type NftsProps = {
  item: NFT;
  id: string;
};

const Card = ({ id, item }: NftsProps) => {
  const { contract } = useContract(MARKET_PLACE_ADDRESS, "marketplace");
  const { data: isListing, isLoading } = useActiveListings(contract, {
    tokenContract: COLLECTION_ADDRESS,
    tokenId: BigNumber.from(item.metadata.id),
  });

  const isWorngNetwork = useNetworkMismatch();
  const address = useAddress();

  const handleBuyout = async () => {
    try {
      if (!address) return toast.error("Please connect your wallet");
      if (isWorngNetwork) return toast.error("Please switch to mumbai network");
      await contract?.buyoutListing(BigNumber.from(item.metadata.id), 1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="border-2 border-slate-300 rounded-lg  p-4 " key={id}>
      <MediaRenderer
        src={item?.metadata.image}
        width="75"
        height="75"
        className="rounded-lg h-96 w-96"
      />
      <div className="pt-5 flex flex-row justify-between items-center ">
        <div className="flex-col flex ">
          <h4 className="text-slate-300 text-3xl text-extrabold">
            #{item?.metadata.id}
          </h4>
          <p className="text-slate-300 text-xl text-extrabold pt-2">
            {item?.metadata.name}
          </p>
        </div>
        <div className="w-2/5 flex flex-col">
          {isLoading ? (
            <p className="text-white"> loading....</p>
          ) : isListing && isListing[0] ? (
            <>
              <p className="text-white mb-2 text-center">
                {isListing[0].buyoutCurrencyValuePerToken.displayValue} MATIC
              </p>
              <button
                onClick={() => handleBuyout()}
                className="bg-slate-300 text-brand-primary rounded-lg w-full h-11  font-medium   tracking-wider hover:bg-slate-100"
              >
                Buy
              </button>
            </>
          ) : (
            <>
              <div className="flex flex-row items-center justify-start gap-x-2">
                <Image
                  src={`https://api.dicebear.com/6.x/bottts-neutral/png?seed=${item.owner}`}
                  width="100"
                  height="100"
                  className="rounded-full h-8 w-8"
                  alt="avatar"
                />

                <p className="text-white ">{item.owner.slice(0, 8)}...</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
