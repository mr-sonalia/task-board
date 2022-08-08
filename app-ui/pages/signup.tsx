import { Button, Col, Container, Grid, Group, PasswordInput, Text, TextInput, Title } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { BiAt, BiLock, BiUser } from "react-icons/bi";
import { containerSize } from "../constants";
import Wrapper from "./wrapper";

type Props = {};

const Signup = (props: Props) => {
	const router = useRouter();

	const submitHandler = (e: { preventDefault: () => void }) => {
		e.preventDefault();
		router.push("home");
		console.log("Hello");
	};

	return (
		<Wrapper>
			<Container size={containerSize} style={{ height: "100%" }}>
				<Grid>
					<Grid.Col span={4}></Grid.Col>
					<Grid.Col span={4} pl={30} pr={30}>
						<Group pt={100} pb={40} position={"center"}>
							<Image height={50} width={50} src="/assets/Logo.png" alt="Logo" objectFit="contain" />
							<Title order={1} align="left" style={{ userSelect: "none" }}>
								TasksBoard
							</Title>
						</Group>
						<form onSubmit={submitHandler}>
							<Grid>
								<Grid.Col span={6}>
									<TextInput placeholder="John" label="First Name" error="" size="sm" required />
								</Grid.Col>
								<Grid.Col span={6}>
									<TextInput placeholder="Mary" label="Middle Name" error="" size="sm" />
								</Grid.Col>
								<Grid.Col span={12}>
									<TextInput placeholder="Doe" label="Last Name" error="" size="sm" required />
								</Grid.Col>
								<Grid.Col span={6}>
									<TextInput
										placeholder="johndoe@mail.com"
										label="Email"
										error=""
										size="sm"
										required
										icon={<BiAt size={16} />}
									/>
								</Grid.Col>
								<Grid.Col span={6}>
									<TextInput
										placeholder="doejohn_21"
										label="Username"
										error=""
										size="sm"
										required
										icon={<BiUser size={16} />}
									/>
								</Grid.Col>
								<Grid.Col span={6}>
									<PasswordInput
										pb={20}
										placeholder="jdoe1234"
										label="Password"
										error=""
										size="sm"
										required
										icon={<BiLock size={16} />}
									/>
								</Grid.Col>
								<Grid.Col span={6}>
									<PasswordInput
										pb={20}
										placeholder="jdoe1234"
										label="Confirm Password"
										error=""
										size="sm"
										required
										icon={<BiLock size={16} />}
									/>
								</Grid.Col>
							</Grid>
							<Grid>
								<Grid.Col span={12}>
									<Button type="submit" size="sm" fullWidth>
										Sign Up
									</Button>
								</Grid.Col>
							</Grid>

							<Text size="sm" pt={10} align="center">
								Already have an account?&nbsp;
								<Link href={"/login"}>Sign In</Link>
							</Text>
						</form>
					</Grid.Col>
					<Grid.Col span={4}></Grid.Col>
				</Grid>
			</Container>
		</Wrapper>
	);
};

export default Signup;
