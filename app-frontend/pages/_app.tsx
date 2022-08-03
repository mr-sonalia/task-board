/** @format */

import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import type { AppProps } from "next/app";
import { Provider, useSelector } from "react-redux";
import { breakpoints } from "../constants";
import store, { RootState } from "../store";

function MyApp({ Component, pageProps }: AppProps) {

	return (
		<Provider store={store}>
			<Component {...pageProps} />
		</Provider>
	);
}

export default MyApp;
