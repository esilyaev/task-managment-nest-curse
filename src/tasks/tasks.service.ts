import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetFilterTaskDto } from './dto/get-filter-task.dto';
import { Task, TaskStatus } from './tasks.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAll(filterDto: GetFilterTaskDto = {}) {
    let filteredTasks = this.tasks;

    const { status, search } = filterDto;

    if (status) {
      filteredTasks = filteredTasks.filter((t) => {
        return t.status === status;
      });
    }

    if (search) {
      const preparedSearch = search.toLowerCase();
      filteredTasks = filteredTasks.filter((t) => {
        return (
          t.description.toLowerCase().includes(preparedSearch) ||
          t.title.toLowerCase().includes(preparedSearch)
        );
      });
    }

    return filteredTasks;
  }

  getAllWithFilters(filterDto: GetFilterTaskDto) {
    const { status, search } = filterDto;

    let filteredTasks = this.tasks;

    if (status) {
      filteredTasks = filteredTasks.filter((t) => {
        return t.status === status;
      });
    }

    if (search) {
      const preparedSearch = search.toLowerCase();
      filteredTasks = filteredTasks.filter((t) => {
        return (
          t.description.toLowerCase().includes(preparedSearch) ||
          t.title.toLowerCase().includes(preparedSearch)
        );
      });
    }

    return filteredTasks;
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
    const task = this.tasks.find((t) => t.id === id);
    if (!task) throw new NotFoundException(`Task with ID ${id} not found`);
    return task;
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
