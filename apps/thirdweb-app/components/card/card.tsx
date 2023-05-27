import {
  type DirectListing,
  type AuctionListing,
  type Marketplace,
  MediaRenderer,
} from "@thirdweb-dev/react";
import React from "react";
import { BigNumber } from "ethers";

type NftsProps = {
  item: DirectListing | AuctionListing;
  contract: Marketplace | undefined;
};

const Card = ({ contract, item }: NftsProps) => {
  return (
    <div className="border-2 border-slate-300 rounded-lg  p-4 " key={item.id}>
      <MediaRenderer
        src={item?.asset.image}
        width="75"
        height="75"
        className="rounded-lg h-96 w-96"
      />
      <div className="pt-5 flex flex-row justify-between items-center ">
        <div className="flex-col flex ">
          <h4 className="text-slate-300 text-3xl text-extrabold">
            #{item?.id}
          </h4>
          <p className="text-slate-300 text-xl text-extrabold pt-2">
            {item?.asset.name}
          </p>
        </div>
        <div className="w-1/4 flex flex-col">
          <p className="text-white mb-2">
            {item.buyoutCurrencyValuePerToken.displayValue} MATIC
          </p>
          <button
            onClick={async () => {
              try {
                await contract?.buyoutListing(BigNumber.from(item.id), 1);
              } catch (error) {
                console.log(error);
              }
            }}
            className="bg-slate-300 text-brand-primary rounded-lg w-full h-11  font-medium   tracking-wider hover:bg-slate-100"
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
