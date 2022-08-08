/** @format */

import { Button, Checkbox, Col, Container, Grid, Modal, Textarea, TextInput } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { showNotification } from "@mantine/notifications";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { BiCheck, BiPlus } from "react-icons/bi";
import { useSelector } from "react-redux";
import { columnSizes, containerSize } from "../../constants";
import { AppDispatch, RootState, useAppDispatch } from "../../store";
// import { createTaskAction, deleteListAction } from "../../store/boardSlice";
import { ITask } from "../../types";
import { parseDate } from "../../utils";
import CreateNewList from "../CreateNewList";
import TaskList from "../TaskCard";

type Props = {};

const Main = (props: Props) => {
	const board = useSelector((state: RootState) => state.lists.board);
	const dispatch: AppDispatch = useAppDispatch();

	const [newTaskFormState, setNewTaskFormState] = useState<boolean>(false);
	const [disableSubmit, setDisableSubmit] = useState<boolean>(true);
	const [newTaskNotif, setNewTaskNotif] = useState<boolean>(false);
	const [newTaskDeadline, setNewTaskDeadline] = useState<Date | null>(new Date());
	const [listID, setListID] = useState<string>("");

	const newTaskTitleRef = useRef<HTMLInputElement>(null);
	const newTaskDescRef = useRef<HTMLTextAreaElement>(null);

	const deleteListHandler = (id: string) => {
		// dispatch(deleteListAction(id));
	};

	const addTaskHandler = (listID: string) => {
		setNewTaskFormState(true);
		setListID(listID);
	};

	const newTaskFormCloseHandler = () => {
		setNewTaskFormState(false);
		setNewTaskNotif(false);
		if (newTaskTitleRef.current != null && newTaskDescRef.current != null) {
			newTaskTitleRef.current.value = "";
			newTaskDescRef.current.value = "";
			setNewTaskDeadline(new Date());
		}
	};

	const newTaskFormSubmitHandler = (event: FormEvent) => {
		event.preventDefault();
		
		if (newTaskTitleRef.current != null && newTaskDescRef.current != null) {
			setNewTaskFormState(false);

			showNotification({
				color: "teal",
				title: `New task created successfully!`,
				message: `Task: ${newTaskTitleRef.current.value}.`,
				icon: <BiCheck />,
				autoClose: 2000,
			});

			const task: ITask = {
				// id: createUID("ITEM"),
				id: "12",
				taskDeadline: parseDate(newTaskDeadline ?? new Date()),
				taskDescription: newTaskDescRef.current.value,
				taskIsCompleted: false,
				taskNotification: newTaskNotif,
				taskTitle: newTaskTitleRef.current.value,
			};

			// dispatch(createTaskAction(listID, task));
			newTaskFormCloseHandler();
		}
	};

	const titleChangeHandler = (event: ChangeEvent) => {
		if (newTaskTitleRef.current?.value.length === 0) setDisableSubmit(true);
		else setDisableSubmit(false);
	};

	return (
		<Container size={containerSize}>
			<Modal
				opened={newTaskFormState}
				onClose={() => newTaskFormCloseHandler()}
				title="Create a new task list"
				centered
			>
				<form onSubmit={newTaskFormSubmitHandler}>
					<Grid>
						<Col>
							<TextInput label="Title" size="sm" required ref={newTaskTitleRef} onChange={titleChangeHandler} />
						</Col>
						<Col>
							<Textarea label="Description" minRows={2} autosize size="sm" ref={newTaskDescRef} />
						</Col>
						<Col>
							<DatePicker
								locale="in"
								label="Deadline"
								size="sm"
								dropdownType="modal"
								minDate={new Date()}
								value={newTaskDeadline}
								onChange={setNewTaskDeadline}
							/>
						</Col>
						<Col>
							<Grid align={"center"}>
								<Col md={6} sm={12}>
									<Checkbox
										checked={newTaskNotif}
										label="Enable Notifications"
										radius="xl"
										size="sm"
										color="blue"
										style={{ cursor: "pointer" }}
										onChange={() => setNewTaskNotif(prev => !prev)}
									/>
								</Col>
								<Col md={6} sm={12}>
									<Button variant="light" color="blue" size="sm" type="submit" fullWidth disabled={disableSubmit}>
										<BiPlus /> Add Task
									</Button>
								</Col>
							</Grid>
						</Col>
					</Grid>
				</form>
			</Modal>
			{board.length > 0 && (
				<Grid>
					{/* {board.map((list: ITaskList) => {
						return (
							<Col key={list.id} {...columnSizes}>
								<TaskList list={list} deleteList={deleteListHandler} addTask={addTaskHandler} />
							</Col>
						);
					})} */}
				</Grid>
			)}
			<CreateNewList />
		</Container>
	);
};

export default Main;
