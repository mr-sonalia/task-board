import { Affix, Button, Col, Grid, Modal, TextInput, Tooltip } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Fragment, useRef, useState } from "react";
import { BiPlus, BiX } from "react-icons/bi";
import { AppDispatch, useAppDispatch } from "../../store";
import { createListAction } from "../../store/boardSlice";

type Values = {
	newListTitle: string;
};

const CreateNewList: React.FC = () => {
	const dispatch: AppDispatch = useAppDispatch();

	const [opened, setOpened] = useState<boolean>(false);
	const newListTitleRef = useRef<HTMLInputElement>(null);
	const form = useForm({
		initialValues: {
			newListTitle: "",
		},
		validate: {
			newListTitle: value => (value.length > 0 ? null : "List name is required"),
		},
	});

	const submitHandler = (values: Values) => {
		setOpened(false);

		const listTitle = values.newListTitle;
		dispatch(createListAction(listTitle));

		// showNotification({
		// 	color: "teal",
		// 	title: `New list created successfully!`,
		// 	message: `List name: ${listTitle}.`,
		// 	icon: <BiCheck />,
		// });

		values.newListTitle = "";
	};

	return (
		<Fragment>
			<Modal opened={opened} onClose={() => setOpened(false)} title="Create a new list" centered>
				<form onSubmit={form.onSubmit(values => submitHandler(values))}>
					<Grid align={"end"}>
						<Col sm={10}>
							<TextInput placeholder="Daily groceries" size="md" required {...form.getInputProps("newListTitle")} />
						</Col>
						<Col sm={2}>
							<Button
								variant="light"
								color="blue"
								size="md"
								type="submit"
								disabled={form.values.newListTitle.length === 0}
							>
								<BiPlus />
							</Button>
						</Col>
					</Grid>
				</form>
			</Modal>

			<Affix position={{ bottom: 20, right: 20 }}>
				<Tooltip label="New list" withArrow position="left">
					<Button variant="light" color="blue" size="lg" onClick={() => setOpened(!opened)}>
						{opened ? <BiX size={20} /> : <BiPlus size={20} />}
					</Button>
				</Tooltip>
			</Affix>
		</Fragment>
	);
};

export default CreateNewList;
