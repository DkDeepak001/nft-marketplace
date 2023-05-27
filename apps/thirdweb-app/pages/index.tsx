import { useContract } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import { Header } from "../components/header";

const Home: NextPage = () => {
  const { contract } = useContract(
    "0xa853c7e388900046392b7C11Af1836FE09699180"
  );

  console.log(contract);
  return (
    <div className="bg-brand-primary  h-full px-32 items-center">
      <Header />
    </div>
  );
};

export default Home;
