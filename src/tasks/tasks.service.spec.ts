import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Status } from './enums/status.enum';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { NotFoundException } from '@nestjs/common';

describe('TasksService', () => {
  let service: TasksService;
  let repository: Repository<Task>;
  
  const mockTaskRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    update: jest.fn(),
    preload: jest.fn(),
    delete: jest.fn(),
    createQueryBuilder: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useValue: mockTaskRepository,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    repository = module.get<Repository<Task>>(getRepositoryToken(Task));
  });

  it('should return an array of tasks', async () => {
    const tasksMock = [
      { id: '1', title: 'Task 1', status: Status.PENDING , createdAt: new Date()},
      { id: '2', title: 'Tasks 2', status: Status.PENDING, createdAt: new Date()},
    ];

    const mockQueryBuilder = {
      andWhere: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue(tasksMock),
    }

    jest
      .spyOn(repository, 'createQueryBuilder')
      .mockReturnValue(mockQueryBuilder as any);  

    const result = await service.findAll();

    expect(result).toEqual(tasksMock);
    expect(mockQueryBuilder.getMany).toHaveBeenCalled();
  });

  it('should create a task', async () => {
    const dto: CreateTaskDto   = { title: 'Task 1' }
    const savedTask  = { id: '1', status: Status.PENDING, createdAt: new Date('2026-01-27T00:00:00Z'), ...dto};

    jest
      .spyOn(repository, 'create')
      .mockReturnValue(savedTask);
    jest
      .spyOn(repository, 'save')
      .mockResolvedValue(savedTask);
    
    const result = await service.create(dto);

    expect(result).toEqual(savedTask);
    expect(repository.create).toHaveBeenCalledWith(dto);
    expect(repository.save).toHaveBeenCalled();
  });

  it('should find one task', async () => {
    const id: Task['id'] = '1';
    const task: Task = { id, title: 'Task 1', description: 'asdasd', status: Status.PENDING, createdAt: new Date('2026-01-27T00:00:00Z')}

    jest
      .spyOn(repository, 'findOneBy')
      .mockResolvedValue(task);

    const result = await service.findOne(id);

    expect(result).toEqual(task);
    expect(repository.findOneBy).toHaveBeenCalledWith({ id });
  });

  it('should throw NotFoundException if task does not exist', async () => {
    const id: Task['id'] = '9999';

    jest
      .spyOn(repository, 'findOneBy')
      .mockResolvedValue(null);
    
    await expect(service.findOne(id)).rejects.toThrow(NotFoundException);
  });

  it('should update task', async () => {
    const id: Task['id'] = '1'
    const dto: UpdateTaskDto = { title: 'Task 1 actualizado' };
    const preloadedTask: Task = {
      id, 
      title: 'Task 1 actualizado', 
      description: 'asdasd', 
      status: Status.PENDING, 
      createdAt: new Date('2026-01-27T00:00:00Z')
    };

    jest
      .spyOn(repository, 'preload')
      .mockResolvedValue(preloadedTask);
    
    jest
      .spyOn(repository, 'save')
      .mockResolvedValue(preloadedTask);
    
    const result = await service.update(id, dto);

    expect(result).toEqual(preloadedTask);
    expect(repository.preload).toHaveBeenCalledWith({ id, ...dto });
    expect(repository.save).toHaveBeenCalledWith(preloadedTask);
  });

  it('should throw NotFoundException if task does not exist', async () => {
    const id: Task['id'] = '9999';
    const dto: UpdateTaskDto = { title: 'Task 1 actualizado' }

    jest
      .spyOn(repository, 'preload')
      .mockResolvedValue(null);

    await expect(service.update(id, dto)).rejects.toThrow(NotFoundException);
  });

  it('should delete task', async () => {
    const id = '1';
    const message = { message: 'Task deleted' }
    
    jest
      .spyOn(repository, 'delete')
      .mockResolvedValue({ affected: 1 } as any);
    
    const result = await service.remove(id);
    
    expect(result).toEqual(message);
    expect(repository.delete).toHaveBeenCalledWith(id);
  });
  
  it('should throw NotFoundException if task does not exist', async () => {
    const id: Task['id'] = '1';

    jest
      .spyOn(repository, 'delete')
      .mockResolvedValue({ affected: 0 } as any);
    
    await expect(service.remove(id)).rejects.toThrow(NotFoundException);
    expect(repository.delete).toHaveBeenCalledWith(id);
  });
});
