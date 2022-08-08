import { showNotification, updateNotification } from "@mantine/notifications";
import React, { useEffect } from "react";
import { BiCheck } from "react-icons/bi";
import { useSelector } from "react-redux";
import Main from "../components/Main";
import { RootState, useAppDispatch } from "../store";
import Wrapper from "./wrapper";

type Props = {};

const Home = (props: Props) => {
	const dispatch = useAppDispatch();

	// useEffect(() => {
	// 	// dispatch(fetchBoardAction());
	// }, [dispatch]);

	const isLoading = useSelector((state: RootState) => state.login.loading);
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
	}, [isLoading, error]);

	return (
		<Wrapper>
			<Main />
		</Wrapper>
	);
};

export default Home;
