import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { Delete } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Param } from '@nestjs/common/decorators/http/route-params.decorator';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './tasks.model';
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

  @Get('/:id')
  show(@Param('id') id: string) {
    return this.tasksService.findById(id);
  }

  @Delete('/:id')
  destroy(@Param('id') id: string) {
    return this.tasksService.delete(id);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body('status') status: TaskStatus) {
    return this.tasksService.update(id, status);
  }
}
