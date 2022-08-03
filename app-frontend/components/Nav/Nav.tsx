/** @format */

import { Col, Container, Grid, Navbar, Switch, Text, Title } from "@mantine/core";
import Image from "next/image";
import { useState } from "react";
import { BiUser } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { containerSize } from "../../constants";
import { switchColorScheme } from "../../store/uiSlice";

type Props = {};

const Nav = (props: Props) => {
	const [colorScheme, setColorScheme] = useState(true);
	const dispatch = useDispatch();

	const colorSchemeChangeHandler = () => {
		setColorScheme(prev => !prev);
		dispatch(switchColorScheme());
		console.log("Change")
	};

	return (
		<Navbar height={60} p="xs" mb={10} style={{ borderBottom: `1px solid #333` }}>
			<Container style={{ width: "100%" }} size={containerSize}>
				<Grid m={"auto"} grow>
					<Col xs={4} style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>
						<Image height={24} width={24} src="/assets/Logo.png" alt="Logo" objectFit="contain" />
						<Title order={4} align="left">
							TasksBoard
						</Title>
					</Col>
					<Col xs={4} style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 20 }}>
						<Switch
							checked={colorScheme}
							onChange={colorSchemeChangeHandler}
							onLabel="Dark"
							offLabel="Light"
							color={"dark"}
							size={"lg"}
							radius={"sm"}
						/>
						<Text align="right">John Doe</Text>
						<BiUser size={20} /> {/* To be replaced with user profile */}
					</Col>
				</Grid>
			</Container>
		</Navbar>
	);
};

export default Nav;
