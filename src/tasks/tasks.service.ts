import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetFilterTaskDto } from './dto/get-filter-task.dto';
import { TaskStatus } from './tasks-status.enum';
import { Task } from './tasks.entity';

@Injectable()
export class TasksService {
  /**
   *
   */
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
  ) {}

  async findById(id: string) {
    const task = await this.tasksRepository.findOneBy({ id });
    if (!task) {
      throw new NotFoundException();
    }
    return task;
  }

  // getAll(filterDto: GetFilterTaskDto = {}) {
  //   let filteredTasks = this.tasksRepo.;

  //   const { status, search } = filterDto;

  //   if (status) {
  //     filteredTasks = filteredTasks.filter((t) => {
  //       return t.status === status;
  //     });
  //   }

  //   if (search) {
  //     const preparedSearch = search.toLowerCase();
  //     filteredTasks = filteredTasks.filter((t) => {
  //       return (
  //         t.description.toLowerCase().includes(preparedSearch) ||
  //         t.title.toLowerCase().includes(preparedSearch)
  //       );
  //     });
  //   }

  //   return filteredTasks;
  // }

  // getAllWithFilters(filterDto: GetFilterTaskDto) {
  //   const { status, search } = filterDto;

  //   let filteredTasks = this.tasks;

  //   if (status) {
  //     filteredTasks = filteredTasks.filter((t) => {
  //       return t.status === status;
  //     });
  //   }

  //   if (search) {
  //     const preparedSearch = search.toLowerCase();
  //     filteredTasks = filteredTasks.filter((t) => {
  //       return (
  //         t.description.toLowerCase().includes(preparedSearch) ||
  //         t.title.toLowerCase().includes(preparedSearch)
  //       );
  //     });
  //   }

  //   return filteredTasks;
  // }

  async create(dto: CreateTaskDto) {
    const { title, description } = dto;
    const task = this.tasksRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    return await this.tasksRepository.save(task);
  }

  // findById(id: string) {
  //   const task = this.tasks.find((t) => t.id === id);
  //   if (!task) throw new NotFoundException(`Task with ID ${id} not found`);
  //   return task;
  // }

  // update(id: string, status: TaskStatus) {
  //   const task = this.findById(id);
  //   task.status = status;
  //   return task;
  // }

  // delete(id: string) {
  //   this.tasks = this.tasks.filter((t) => t.id !== id);
  // }
}
