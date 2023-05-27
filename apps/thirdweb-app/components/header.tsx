import { ConnectWallet } from "@thirdweb-dev/react";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

const Header: NextPage = () => {
  return (
    <div className="flex flex-row justify-between py-5  ">
      <div className="flex flex-row items-center gap-x-2 ">
        <Image
          src="/logo.png"
          alt="Thirdweb Logo"
          width={50}
          height={50}
          className="rounded-full"
        />
        <h1 className="text-3xl font-bold text-brand-optional ml-2">Wiz Nft</h1>
        d
      </div>
      <div className="flex flex-row items-center gap-x-20">
        <Link
          href="/myNfts"
          className="text-white font-bold text-lg uppercase "
        >
          My Nft
        </Link>
        <ConnectWallet />
      </div>
    </div>
  );
};

export default Header;
