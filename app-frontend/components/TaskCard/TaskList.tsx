/** @format */

import { Card, Divider, Group, List, Menu, Progress, Text } from "@mantine/core";
import React, { Fragment } from "react";
import { BiEditAlt, BiPlus, BiTrash } from "react-icons/bi";
import { ITask, ITaskList } from "../../types";
import TaskItem from "../TaskItem";
import classes from "./TaskCard.module.scss";

type Props = {
	list: ITaskList;
	children?: typeof React.Children;
	deleteList: (id: string) => void;
	addTask: (listID: string) => void;
};

const TaskList = (props: Props) => {
	let completeCount = 0;
	const list =
		props.list.taskList.length > 0 ? (
			props.list.taskList.map((task: ITask) => {
				if (task.taskIsCompleted) completeCount++;
				return <TaskItem key={task.id} listId={props.list.id} task={task} />;
			})
		) : (
			<List.Item>
				<Text align="center">No tasks created.</Text>
			</List.Item>
		);

	const progress = (completeCount / (props.list.taskList.length || 1)) * 100;

	return (
		<div style={{ height: "100%", width: "100%" }}>
			<Card shadow="sm" p="lg" style={{ height: "inherit" }}>
				<Group position="apart" style={{ marginBottom: 5 }}>
					<Text size="sm" weight={600}>
						{props.list.listTitle}
					</Text>
					<Menu withArrow>
						<Menu.Label>Card Settings</Menu.Label>
						<Menu.Item color="blue" icon={<BiPlus size={14} />} onClick={() => props.addTask(props.list.id)}>
							New task
						</Menu.Item>
						<Menu.Item icon={<BiEditAlt size={14} />}>Change list title</Menu.Item>
						<Menu.Item onClick={() => props.deleteList(props.list.id)} color="red" icon={<BiTrash size={14} />}>
							Delete list
						</Menu.Item>
					</Menu>
				</Group>
				<Divider mt={16} mb={16} />

				<div className={classes["list-container"]}>
					<List className={classes["list"]} listStyleType={"none"}>
						{list}
					</List>
				</div>
				{props.list.taskList.length > 0 && (
					<Fragment>
						<Divider mt={8} mb={8} />
						<Text size="xs" color={"gray"} mb={4}>
							Progress: {completeCount} / {props.list.taskList.length}
						</Text>
						<Progress color={progress === 100 ? "teal" : "blue"} size={"xs"} value={progress} />
					</Fragment>
				)}
			</Card>
		</div>
	);
};

export default TaskList;
