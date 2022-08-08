import {
	Button,
	Col,
	Container,
	Grid,
	Group,
	PasswordInput,
	Text,
	TextInput,
	Title
} from "@mantine/core";
import { useForm } from "@mantine/form";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useEffect } from "react";
import { BiLock, BiUser } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { containerSize } from "../constants";
import { AppDispatch, RootState } from "../store";
import { loginUserAction } from "../store/loginSlice";
import Wrapper from "./wrapper";

type Props = {};

const Login = (props: Props) => {
	const login = useSelector((state: RootState) => state.login);
	const router = useRouter();
	const form = useForm({
		initialValues: {
			usernameOrEmail: "sonaliayash",
			password: "test_password",
		},
		validate: {
			usernameOrEmail: value => {
				if (value.length === 0) return "Username/email required";
				else if (value.length < 4) return "Username/email invalid";
			},
			password: value => {
				if (value.length === 0) return "Passwword required";
				else if (value.length < 8) return "Password invalid";
			},
		},
	});
	const dispatch: AppDispatch = useDispatch();

	const submitHandler = () => {
		dispatch(loginUserAction(form.values));
	};

	useEffect(() => {
		if (login.loggedin) {
			form.setErrors({
				usernameOrEmail: "",
				password: "",
			});
			router.push("/home");
		} else if (login.error === "User does not exist")
			form.setErrors({
				usernameOrEmail: login.error,
			});
		else
			form.setErrors({
				password: login.error,
			});
	}, [login.error, login.loading]);

	return (
		<Wrapper>
			<Container size={containerSize} style={{ height: "100%" }}>
				<Grid>
					<Grid.Col span={4}></Grid.Col>
					<Grid.Col span={4} pl={30} pr={30}>
						<Group pt={140} pb={40} position={"center"}>
							<Image
								height={50}
								width={50}
								src="/assets/Logo.png"
								alt="Logo"
								objectFit="contain"
							/>
							<Title order={1} align="left" style={{ userSelect: "none" }}>
								TasksBoard
							</Title>
						</Group>
						<form onSubmit={form.onSubmit(submitHandler)}>
							<TextInput
								pb={10}
								placeholder="johndoe@mail.com"
								label="Username or email"
								size="sm"
								required
								icon={<BiUser size={16} />}
								{...form.getInputProps("usernameOrEmail")}
							/>
							<PasswordInput
								pb={20}
								placeholder="jdoe12345678"
								label="Password"
								size="sm"
								required
								icon={<BiLock size={16} />}
								{...form.getInputProps("password")}
							/>
							<Grid>
								<Grid.Col span={12}>
									<Button
										type="submit"
										size="sm"
										fullWidth
										loading={login.loading}
									>
										Sign In
									</Button>
								</Grid.Col>
							</Grid>

							<Text size="sm" pt={10} align="center">
								Don&apos;t have an account?&nbsp;
								<Link href={"/signup"}>Create one!</Link>
							</Text>
						</form>
					</Grid.Col>
					<Grid.Col span={4}></Grid.Col>
				</Grid>
			</Container>
		</Wrapper>
	);
};

export default Login;
