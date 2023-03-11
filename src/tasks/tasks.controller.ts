import { Body, Controller, Get, Post } from '@nestjs/common';
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
  store(
    @Body('title') title: string,
    @Body('description') description: string,
  ) {
    return this.tasksService.create(title, description);
  }
}
