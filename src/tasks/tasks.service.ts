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
      throw new NotFoundException(`Not found task with ID: ${id}`);
    }
    return task;
  }

  async create(dto: CreateTaskDto) {
    const { title, description } = dto;
    const task = this.tasksRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    return await this.tasksRepository.save(task);
  }

  async delete(id: string) {
    const task = await this.findById(id);
    return await this.tasksRepository.remove(task);
  }

  async update(id: string, status: TaskStatus) {
    const task = await this.findById(id);
    task.status = status;
    return await this.tasksRepository.save(task);
  }

  async getAll(filter: GetFilterTaskDto) {
    const { status, search } = filter;
    const query = this.tasksRepository.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      const lowerSearch = search.toLowerCase();
      query.andWhere('LOWER(task.title) LIKE :search OR LOWER(task.description) LIKE :search', {
        search: `%${lowerSearch}%`,
      });
    }

    return await query.getMany();
  }
}
