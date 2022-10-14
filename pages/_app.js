import SEO from "@/components/SEO/SEO";
import "@/styles/global.css";
import { Provider } from "src/lib/hooks/useAppContext";

const App = ({ Component, pageProps }) => (
  <>
    <SEO />
    <Provider>
      <Component {...pageProps} />
    </Provider>
  </>
);

export default App;
