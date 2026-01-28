import { applyDecorators } from "@nestjs/common";
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam } from "@nestjs/swagger";
import { Task } from '../../../../src/tasks/entities/task.entity';

export function ApiFindOneTask() {
  return applyDecorators(
    ApiOperation({ summary: 'Get a task by ID' }),
    ApiOkResponse({ description: 'Task found', type: Task }),
    ApiNotFoundResponse({ description: 'Task not found' }),
    ApiParam({ name: 'id', description: 'UUID of the task' }),
  );
}