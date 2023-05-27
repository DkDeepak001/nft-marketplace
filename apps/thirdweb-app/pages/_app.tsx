import type { AppProps } from "next/app";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";
import { Amaranth } from "next/font/google";

//font setyop
const amaranth = Amaranth({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-amarnath",
});

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = ChainId.Mumbai;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider activeChain={activeChain}>
      <div className={`${amaranth.variable} font-amarnath`}>
        <Component {...pageProps} />
      </div>
    </ThirdwebProvider>
  );
}

export default MyApp;
