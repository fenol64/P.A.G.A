import  { Html, Head, Main, NextScript } from "next/document";
import { Container } from '@interchain-ui/react';


export default function DocumentContainer() {
    return (
        <Html lang="en" data-bs-spy="scroll" data-bs-target="#navbar" data-bs-offset="100" data-bs-theme="light">
            <Head>
                <link rel="stylesheet" href="/plugins/fontawesome/css/all.min.css" />

                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" />
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
            </Head>
            <body className="bg-light">
    <Container maxWidth="64rem" attributes={{ py: '$14' }}>
                <Main />
    </Container>
                <NextScript />
            </body>
        </Html>
    );
}