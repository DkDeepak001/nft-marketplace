import { ConnectWallet } from "@thirdweb-dev/react";
import Image from "next/image";

export const Header = () => {
  return (
    <div className="flex flex-row justify-between py-5">
      <div className="flex flex-row items-center gap-x-2">
        <Image
          src="/logo.png"
          alt="Thirdweb Logo"
          width={50}
          height={50}
          className="rounded-full"
        />
        <h1 className="text-3xl font-bold text-brand-optional ml-2">Wiz Nft</h1>
      </div>
      <ConnectWallet />
    </div>
  );
};
