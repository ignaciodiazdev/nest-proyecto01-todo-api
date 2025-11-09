import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query, HttpCode } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';
import { CreateTaskDto, UpdateTaskDto, FilterTaskDto } from './dto'

import { ApiCreateTask, ApiFindAllTasks, ApiFindOneTask, ApiUpdateTask, ApiRemoveTask } from './decorators/swagger'

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiCreateTask()
  create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  @ApiFindAllTasks()
  findAll(@Query() filterTaskDto: FilterTaskDto) {
    return this.tasksService.findAll(filterTaskDto);
  }

  @Get(':id')
  @ApiFindOneTask()
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.tasksService.findOne(id);
  }

  @Patch(':id')
  @ApiUpdateTask()
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Patch(':id/complete')
  completeTask(@Param('id', ParseUUIDPipe) id: string){
    return this.tasksService.completeTask(id);
  }

  @Delete(':id')
  @ApiRemoveTask()
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.tasksService.remove(id);
  }
}