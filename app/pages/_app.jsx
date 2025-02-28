import Head from "next/head";
import "root/styles/globals.css";
import { Magic as MagicBase } from 'magic-sdk';
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const MagicContext = createContext({
    magic: null,
});

export const useMagic = () => useContext(MagicContext)

export default function AppContainer({ Component, pageProps }) {

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

    return (
        <>
            <Head>
                <title>P.A.G.A.</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <MagicContext.Provider value={value}>
                <Component {...pageProps} />
            </MagicContext.Provider>
        </>
    );
}