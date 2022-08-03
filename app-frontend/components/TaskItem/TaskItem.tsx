import { Button, Checkbox, Col, Grid, List, Popover, Text, useMantineTheme } from "@mantine/core";
import { Fragment, useState } from "react";
import { BiBell, BiBellOff, BiEditAlt, BiTrash } from "react-icons/bi";
import { ITask } from "../../types";

interface Props {
	task: ITask;
	listId: string;
}

const TaskItem = ({ task, listId: parentListId }: Props) => {
	const [opened, setOpened] = useState(false);
	const theme = useMantineTheme();

	const taskChangeHandler = () => {};

	return (
		<Fragment>
			<List.Item>
				<Grid align={"center"}>
					<Col xs={1}>
						<Checkbox
							checked={task.taskIsCompleted}
							radius="xl"
							size="sm"
							color="teal"
							style={{ cursor: "pointer" }}
							onChange={taskChangeHandler}
						/>
					</Col>
					<Col
						xs={7}
						style={{
							overflow: "hidden",
						}}
					>
						<Popover
							opened={opened}
							onClose={() => setOpened(false)}
							target={
								<Text
									style={{
										cursor: "pointer",
										textDecoration: task.taskIsCompleted ? "line-through" : "none",
										fontStyle: task.taskIsCompleted ? "italic" : "normal",
									}}
									styles={theme => ({
										root: {
											"&:hover": {
												color: theme.colorScheme === "dark" ? theme.colors.gray[0] : theme.colors.gray[7],
											},
										},
									})}
									size="sm"
									onClick={() => setOpened(!opened)}
									pl={8}
								>
									{task.taskTitle}
								</Text>
							}
							width={260}
							position="bottom"
							placement="end"
							shadow={"xl"}
							closeOnEscape
							withArrow
							withCloseButton
							title="Task description"
						>
							<div>
								<Text size="sm">{task.taskDescription}</Text>
								<Text mt={16} size="sm" weight={600} align="center">
									{task.taskDeadline}
								</Text>
								<Text size="xs" align="center" color={task.taskIsCompleted ? "green" : "yellow"}>
									{task.taskIsCompleted ? "Completed" : "Due"}
								</Text>
							</div>
						</Popover>
					</Col>
					<Col xs={4} style={{ display: "flex", justifyContent: "space-evenly", gap: 2 }}>
						<Button p={2} variant="subtle" size="xs" compact>
							{task.taskNotification ? (
								<BiBell size={14} color={theme.colors.blue[4]} />
							) : (
								<BiBellOff size={14} color={theme.colors.blue[4]} />
							)}
						</Button>
						<Button p={2} variant="subtle" color={"gray"} size="xs" compact>
							<BiEditAlt size={14} />
						</Button>
						<Button p={2} variant="subtle" color={"red"} size="xs" compact>
							<BiTrash size={14} color={theme.colors.red[5]} />
						</Button>
					</Col>
				</Grid>
			</List.Item>
		</Fragment>
	);
};

export default TaskItem;
