import "../styles/globals.css";
import { AuthProvider } from "../auth";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
