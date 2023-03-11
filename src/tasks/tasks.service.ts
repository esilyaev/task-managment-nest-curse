import { Injectable } from '@nestjs/common';
import { title } from 'process';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TasksStatus } from './tasks.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAll() {
    return this.tasks;
  }

  create(dto: CreateTaskDto) {
    const { title, description } = dto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TasksStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }
}
