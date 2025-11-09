import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from './enums/status.enum';
import { FilterTaskDto } from './dto/filter-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ){}
  async create(createTaskDto: CreateTaskDto) {
    const instanceTask   = this.taskRepository.create(createTaskDto);
    const newTask        = await this.taskRepository.save(instanceTask);
    return newTask;
  }

  async findAll(filterTaskDto: FilterTaskDto) {
    // let condition: FindManyOptions<Task> = {};
    const query = this.taskRepository.createQueryBuilder('task');

    if (filterTaskDto?.status) {
      query.andWhere('task.status = :status', { status: filterTaskDto.status });
    }

    if (filterTaskDto?.title) {
      query.andWhere('task.title ILIKE :title', { title: `%${filterTaskDto.title}%` });
    }

    return await query.getMany();
  }

  async findOne(id: string) {
    const task = await this.taskRepository.findOneBy({id});
    if(!task) throw new NotFoundException(`User not found with id: ${id}`)
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskRepository.preload({
      id,
      ...updateTaskDto
    });

    if(!task) throw new NotFoundException(`User not found with id: ${id}`);

    return await this.taskRepository.save(task);
  }

  async completeTask(id: string){
    const task = await this.taskRepository.preload({
      id,
      status: Status.DONE
    });

    if(!task) throw new NotFoundException(`User not found with id: ${id}`);

    return await this.taskRepository.save(task);
  }

  async remove(id: string) {
    const result = await this.taskRepository.delete(id);

    if(result.affected === 0){
      throw new NotFoundException(`User not deleted because user with id: ${id} not found`);
    }
    return {message: 'User deleted'};
  }
}
