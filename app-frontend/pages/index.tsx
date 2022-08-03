/** @format */

import { MantineProvider } from "@mantine/core";
import { NotificationsProvider, showNotification, updateNotification } from "@mantine/notifications";
import type { NextPage } from "next";
import { useEffect } from "react";
import { BiCheck } from "react-icons/bi";
import { useSelector } from "react-redux";
import Head from "../components/Head";
import Main from "../components/Main";
import Nav from "../components/Nav/Nav";
import { breakpoints } from "../constants";
import { RootState, useAppDispatch } from "../store";
import { fetchBoardAction } from "../store/boardSlice";

const Home: NextPage = () => {
	const ui = useSelector((state: RootState) => state.ui);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchBoardAction());
	}, []);

	const isLoading = useSelector((state: RootState) => state.lists.isLoading);
	const error = useSelector((state: RootState) => state.lists.error);

	useEffect(() => {
		if (isLoading)
			showNotification({
				id: "load-data",
				loading: true,
				title: "Loading your data",
				message: "Data will be loaded a few seconds, please wait.",
				autoClose: false,
				disallowClose: true,
			});
		else if (!isLoading && error.length === 0)
			updateNotification({
				id: "load-data",
				color: "teal",
				title: "Successful!",
				message: "All lists were loaded successfully",
				icon: <BiCheck />,
				autoClose: 2000,
			});
		else {
			updateNotification({
				id: "load-data",
				color: "red",
				title: "Couldn't load data!",
				message: error,
				autoClose: 5000,
			});
		}

		// console.log(isLoading, error);
	}, [isLoading, error]);

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
				<Nav />
				<Head />
				<Main />
			</NotificationsProvider>
		</MantineProvider>
	);
};

export default Home;
