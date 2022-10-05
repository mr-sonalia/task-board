/** @format */

import { MantineProvider } from "@mantine/core";
import {
	NotificationsProvider,
} from "@mantine/notifications";
import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import Head from "../components/Head";
import Nav from "../components/Nav/Nav";
import { breakpoints } from "../constants";
import { RootState, useAppDispatch } from "../store";

type Props = {
	children: ReactNode;
};

const Wrapper = ({ children }: Props) => {
	const ui = useSelector((state: RootState) => state.ui);
	const login = useSelector((state: RootState) => state.login);

	return (
		<MantineProvider
			theme={{
				colorScheme: ui.colorScheme,
				breakpoints: {
					xs: breakpoints["xs"],
					sm: breakpoints["sm"],
					md: breakpoints["md"],
					lg: breakpoints["lg"],
					xl: breakpoints["xl"],
				},
			}}
			withGlobalStyles
			withNormalizeCSS
		>
			<NotificationsProvider position="bottom-left" zIndex={2077}>
				{login.loggedin && <Nav ui={ui} />}
				<Head />
				{children}
			</NotificationsProvider>
		</MantineProvider>
	);
};

export default Wrapper;
