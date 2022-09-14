import "@/styles/global.css";
import { Provider } from "src/lib/hooks/useAppContext";

const App = ({ Component, pageProps }) => (
  <Provider>
    <Component {...pageProps} />
  </Provider>
);

export default App;
