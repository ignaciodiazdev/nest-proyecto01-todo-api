import { applyDecorators } from "@nestjs/common";
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";

export function ApiRemoveTask() {
  return applyDecorators(
    ApiOperation({ summary: 'Delete a task by ID' }),
    ApiOkResponse({ description: 'Task deleted successfully' }),
    ApiNotFoundResponse({ description: 'Task not found' }),
    ApiParam({ name: 'id', description: 'UUID of the task' }),
  );
}