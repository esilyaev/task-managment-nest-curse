import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskStatus } from './tasks.model';

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
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  findById(id: string) {
    return this.tasks.find((t) => t.id === id);
  }

  update(id: string, status: TaskStatus) {
    const task = this.findById(id);
    task.status = status;
    return task;
  }

  delete(id: string) {
    this.tasks = this.tasks.filter((t) => t.id !== id);
  }
}
