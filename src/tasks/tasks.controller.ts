import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  /**
   * Controller for Tasks endpoints
   */
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  index() {
    return this.tasksService.getAll();
  }

  @Post()
  store(@Body() dto: CreateTaskDto) {
    return this.tasksService.create(dto);
  }
}
