import { applyDecorators } from "@nestjs/common";
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";
import { Task } from "src/tasks/entities/task.entity";

export function ApiUpdateTask() {
  return applyDecorators(
    ApiOperation({ summary: 'Update a task by ID' }),
    ApiOkResponse({ description: 'Task updated successfully', type: Task }),
    ApiNotFoundResponse({ description: 'Task not found' }),
    ApiParam({ name: 'id', description: 'UUID of the task' }),
  );
}