import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Task } from '../../../../src/tasks/entities/task.entity';

export function ApiFindAllTasks() {
  return applyDecorators(
    ApiOperation({ summary: 'Get all tasks with optional filters' }),
    ApiOkResponse({ description: 'List of tasks', type: [Task] })
  );
}