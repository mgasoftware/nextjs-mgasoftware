import { type AppType } from "next/dist/shared/lib/utils";
import "~/styles/globals.css";
import { Provider } from "react-redux";
import { Montserrat } from 'next/font/google'

import store from "~/store/store";

const montserrat = Montserrat({
  weight:['200', '300', '400', '500'],
  style:['italic', 'normal'],
  subsets: ['latin'],
})


const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <main className={montserrat.className}>
        <Component {...pageProps} />
      </main>
    </Provider>
  );
};

export default MyApp;
