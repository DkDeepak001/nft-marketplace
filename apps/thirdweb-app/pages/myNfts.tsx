import { NextPage } from "next";
import { useAddress, useContract, useOwnedNFTs } from "@thirdweb-dev/react";

const CONTRACT_ADDRESS = "0xa853c7e388900046392b7C11Af1836FE09699180";

const myNfts: NextPage = () => {
  const { contract } = useContract(CONTRACT_ADDRESS);

  const address = useAddress();
  const { data, isLoading, error } = useOwnedNFTs(contract, address);
  console.log(data);

  return <div></div>;
};

export default myNfts;
