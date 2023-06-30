import { ColumnChangeProvider } from "@/providers/ColumnSwitcher";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ColumnChangeProvider>
      <Component {...pageProps} />
    </ColumnChangeProvider>
  );
}
