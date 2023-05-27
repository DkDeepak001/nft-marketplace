import { useContract } from "@thirdweb-dev/react";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const { contract } = useContract(
    "0xa853c7e388900046392b7C11Af1836FE09699180"
  );

  console.log(contract);
  return (
    <div className="bg-brand-primary h-screen w-screen flex text-brand-optional  flex-row items-center  text-xl font-bold text-center justify-center">
      Thirdweb
    </div>
  );
};

export default Home;
