import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateTaskListDTO } from "./dtos/create-tasklist.dto";
import { TasklistService } from "./tasklist.service";

@Controller("/api/tasklists")
export class TasklistController {
	constructor(private readonly taskListService: TasklistService) {}

	@Get("/")
	findAll() {
		return this.taskListService.findAll();
	}

	@Post("/")
	createTaskList(@Body() createTasklistDto: CreateTaskListDTO) {
		this.taskListService.create(createTasklistDto);
	}

	@Get("/:listId")
	findByListId(@Param("listId") listId: string) {
		return this.taskListService.findByListId(listId);
	}


}
