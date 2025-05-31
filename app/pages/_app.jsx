import Head from "next/head";
import "root/styles/globals.css";
import { Magic as MagicBase } from 'magic-sdk';
import { createContext, useContext, useEffect, useMemo, useState } from "react";
const MagicContext = createContext({
    magic: null,
});


import { wallets } from 'cosmos-kit';
import { ChainProvider } from '@cosmos-kit/react';
import { assets, chains } from 'chain-registry';
import {
  Box,
  ThemeProvider,
  useColorModeValue,
  useTheme,
} from '@interchain-ui/react';

export const useMagic = () => useContext(MagicContext)

export default function AppContainer({ Component, pageProps }) {
const { themeClass } = useTheme();
    const [magic, setMagic] = useState(null);

    const value = useMemo(() => {
        return {
            magic,
        };
    }, [magic]);

    useEffect(() => {
        if (process.env.NEXT_PUBLIC_MAGIC_API_KEY) {
            const magic = new MagicBase(process.env.NEXT_PUBLIC_MAGIC_API_KEY, {
                network: {
                    rpcUrl: process.env.NEXT_PUBLIC_RPC_URL,
                    chainId: process.env.NEXT_PUBLIC_CHAIN_ID,
                },
            });

            setMagic(magic);
        }
    }, []);

      const signerOptions = {
    // signingStargate: () => {
    //   return getSigningCosmosClientOptions();
    // }
  };

    return (
    <ThemeProvider>
      <ChainProvider
        // @ts-ignore
        chains={chains}
        // @ts-ignore
        assetLists={assets}
        wallets={wallets}
        walletConnectOptions={{
          signClient: {
            projectId: 'a8510432ebb71e6948cfd6cde54b70f7',
            relayUrl: 'wss://relay.walletconnect.org',
            metadata: {
              name: 'Cosmos Kit dApp',
              description: 'Cosmos Kit dApp built by Create Cosmos App',
              url: 'https://docs.hyperweb.io/cosmos-kit/',
              icons: [],
            },
          },
        }}
        // @ts-ignore
        signerOptions={signerOptions}
      >
        <Box
          className={themeClass}
          minHeight="100dvh"
          backgroundColor={useColorModeValue('$white', '$background')}
        >
          {/* @ts-ignore */}
          <Component {...pageProps} />
        </Box>
      </ChainProvider>
    </ThemeProvider>
    );
}