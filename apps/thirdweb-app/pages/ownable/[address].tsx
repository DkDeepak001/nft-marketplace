"use client";
import { NextPage } from "next";
import {
  MediaRenderer,
  useActiveListings,
  useAddress,
  useCancelListing,
  useContract,
  useCreateDirectListing,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import Header from "../../components/header";
import { COLLECTION_ADDRESS, MARKET_PLACE_ADDRESS } from "../../const/address";
import { useCallback, useState } from "react";
import { NATIVE_TOKEN_ADDRESS, NFT } from "@thirdweb-dev/sdk";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Image from "next/image";

const Profile: NextPage = () => {
  const router = useRouter();
  const { address } = router.query as { address: string };

  if (!address) {
    toast.error("Invalid address");
    router.push("/");
  }
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [seletecNft, setSelectedNft] = useState<NFT | undefined>();
  const [price, setPrice] = useState<number>(); // [price, setPrice
  const { contract: collectionContract } = useContract(COLLECTION_ADDRESS);
  const { contract: marketplaceContract } = useContract(
    MARKET_PLACE_ADDRESS,
    "marketplace"
  );

  const walletAddress = useAddress();
  const {
    data: nfts,
    isLoading,
    error,
  } = useOwnedNFTs(collectionContract, address);

  const {
    mutateAsync: createDirectListing,
    isLoading: isCreatingAuctionListing,
    error: AuctionErrors,
  } = useCreateDirectListing(marketplaceContract);

  const {
    mutateAsync: cancelDirectListing,
    isLoading: iscancelAuctionListing,
    error: cancelAuctionErrors,
  } = useCancelListing(marketplaceContract);

  const { data: myListing, isLoading: myListingLoading } = useActiveListings(
    marketplaceContract,
    {
      seller: address,
      tokenContract: COLLECTION_ADDRESS, // Filter by token contract
    }
  );

  const handleCreateAuction = async () => {
    if (!seletecNft) return toast.error("Please select a NFT");
    if (!price) return toast.error("Please enter a price");
    setShowPopup(false);
    try {
      toast.promise(
        createDirectListing({
          tokenId: seletecNft?.metadata.id.toString(),
          assetContractAddress: COLLECTION_ADDRESS,
          buyoutPricePerToken: price,
          listingDurationInSeconds: 86400,
          startTimestamp: new Date(),
          quantity: 1,
          currencyContractAddress: NATIVE_TOKEN_ADDRESS,
        }),
        {
          loading: "Creating Listing...",
          success: <b>{seletecNft.metadata.id} has be listed </b>,
          error: <b>{seletecNft.metadata.id} has not listed </b>,
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancelAuction = async (id: string) => {
    const listId = myListing?.find((item) => item.asset.id === id);
    if (!listId) return toast.error("Please select a NFT");
    try {
      toast.promise(cancelDirectListing({ id: listId.id, type: listId.type }), {
        loading: "Canceling Listing...",
        success: <b>#{listId.id} has be canceled </b>,
        error: <b>#{listId.id} has not canceled </b>,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const hasListed = useCallback(
    (id: string) => {
      if (!myListing) return false;

      return myListing.some((item) => item.asset.id === id);
    },
    [myListing]
  );

  return (
    <div className="bg-brand-primary  max-h-full min-h-screen  px-32 items-center lg:px-28 sm:px-5">
      <Header />
      <div className="border-b-2 border-slate-300/25  w-full mb-10 mt-3" />
      <div className="flex flex-col flex-wrap gap-8 items-center pb-16  ">
        <div className="flex flex-row items-center gap-x-2">
          <Image
            src={`https://api.dicebear.com/6.x/bottts-neutral/png?seed=${address}`}
            width="100"
            height="100"
            className="rounded-full h-8 w-8"
            alt="avatar"
          />

          <p className="text-slate-300 flex felx-row items-center gap-x-2">
            {address} has{"  "}Owned
            <p className="text-white font-extralight text-xl">
              {"  "}
              {nfts?.length} NFT's
            </p>
          </p>
        </div>
        {isLoading || myListingLoading ? (
          <div className="text-white text-xl">loading nfts of {address}...</div>
        ) : nfts?.length === 0 ? (
          <h1 className="text-white text-3xl">You don't have any NFT's yet</h1>
        ) : (
          nfts?.map((item) => (
            <div
              className="border-[1px] border-slate-300/50 rounded-lg p-4 lg:w-2/5 sm:w-3/4 flex flex-row items-center gap-x-10 justify-between"
              key={item.metadata.id}
            >
              <MediaRenderer
                src={item.metadata.image}
                className="rounded-lg"
                height="120px"
                width="120px"
              />
              <h2 className="text-white text-3xl font-bold ">
                #{item.metadata.id}{" "}
              </h2>
              <h2 className="text-white text-xl font-semibold w-1/4">
                {item.metadata.name}{" "}
              </h2>
              <h2 className="text-white text-xl font-semibold w-14">
                {item.quantityOwned || 1} nft
              </h2>

              {walletAddress === address && (
                <button
                  onClick={() => {
                    hasListed(item.metadata.id)
                      ? handleCancelAuction(item.metadata.id)
                      : setSelectedNft(item);
                    setShowPopup(true);
                  }}
                  className="bg-white text-brand-primary rounded-lg w-1/4 h-11 font-medium tracking-wider "
                >
                  {hasListed(item.metadata.id) ? `Cancel` : `List`}
                </button>
              )}
            </div>
          ))
        )}
      </div>
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white w-1/3 h-1/3 flex flex-col justify-center items-center rounded-lg relative">
            <div
              className="absolute top-5 right-8 text-black text-3xl cursor-pointer"
              onClick={() => setShowPopup(false)}
            >
              X
            </div>
            <h1 className="text-3xl font-bold text-black  mb-5">
              Create Auction
            </h1>
            <div className="flex flex-col gap-4">
              <input
                type="number"
                placeholder="Price"
                className="border-[1px] border-slate-300 rounded-lg p-4 w-full flex flex-row items-center gap-x-10 justify-between "
                onChange={(e) => setPrice(Number(e.target.value))}
                value={price}
              />
            </div>
            <button
              className="bg-black text-white rounded-lg w-1/4 h-11 font-medium tracking-wider mt-5 "
              onClick={() => handleCreateAuction()}
            >
              Create
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default dynamic(() => Promise.resolve(Profile), { ssr: false });
