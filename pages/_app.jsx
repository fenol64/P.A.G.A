import Head from "next/head";
import "root/styles/globals.css";

export default function AppContainer({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>PAGA</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Component {...pageProps} />
        </>
    );
}