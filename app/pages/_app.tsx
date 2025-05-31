"use client";
import "../styles/globals.css";
import "@interchain-ui/react/styles";

import type { AppProps } from "next/app";
import { ChainProvider } from "@interchain-kit/react";
import { assetLists, chains } from "@chain-registry/v2";
import { keplrWallet } from "@interchain-kit/keplr-extension";
import { leapWallet } from "@interchain-kit/leap-extension";
import { ThemeProvider } from "@interchain-ui/react";
import type { FC } from 'react';

const chain = chains.find((chain) => chain.chainName === 'cosmoshub')!;

const CreateInterchainApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider>
      <ChainProvider
        chains={[chain]}
        assetLists={assetLists}
        wallets={[keplrWallet, leapWallet]}
        signerOptions={{}}
        endpointOptions={{ endpoints: {} }}
      >
        <Component {...pageProps} />
      </ChainProvider>
    </ThemeProvider>
  );
};

export default CreateInterchainApp;
