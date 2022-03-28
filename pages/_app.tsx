import type { AppProps } from "next/app";
import { AppProvider } from "@/providers/app";

import "@/styles/style.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  );
}

export default MyApp;
