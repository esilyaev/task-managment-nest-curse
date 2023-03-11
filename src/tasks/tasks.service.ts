import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Task, TasksStatus } from './tasks.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAll() {
    return this.tasks;
  }

  create(title: string, description: string) {
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
