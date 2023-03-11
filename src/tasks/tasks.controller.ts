import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetFilterTaskDto } from './dto/get-filter-task.dto';
import { IdTaskParams } from './dto/id-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  /**
   * Controller for Tasks endpoints
   */
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  index(@Query() filterDto: GetFilterTaskDto) {
    // if (Object.keys(filterDto).length) {
    //   return this.tasksService.getAllWithFilters(filterDto);
    // }
    return this.tasksService.getAll(filterDto);
  }

  @Post()
  @HttpCode(201)
  store(@Body() dto: CreateTaskDto) {
    return this.tasksService.create(dto);
  }

  @Get('/:id')
  show(@Param() params: IdTaskParams) {
    return this.tasksService.findById(params.id);
  }

  @Delete('/:id')
  destroy(@Param() params: IdTaskParams) {
    return this.tasksService.delete(params.id);
  }

  @Patch('/:id')
  update(@Param() params: IdTaskParams, @Body() updateDto: UpdateTaskDto) {
    return this.tasksService.update(params.id, updateDto.status);
  }
}
