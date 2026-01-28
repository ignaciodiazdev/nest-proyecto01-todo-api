import { applyDecorators } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Task } from '../../../../src/tasks/entities/task.entity';

export function ApiCreateTask() {
  return applyDecorators(
    ApiOperation({ summary: 'Create a new task' }),
    ApiCreatedResponse({ description: 'Task created successfully', type: Task }),
    ApiBadRequestResponse({ status: 400, description: 'Invalid input data' }),
  )
};