import { IsEnum, IsOptional, IsString, MinLength } from "class-validator";
import { Status } from "../enums/status.enum";
import { Transform } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class FilterTaskDto{

  @ApiPropertyOptional({
    description : 'Filter tasks by status',
    enum        : Status,
    default     : 'PENDING',
    required    : false,
  })
  @IsOptional()
  @IsString()
  @Transform(({value}) => typeof value === 'string' ? value.toUpperCase() : value)
  @IsEnum(Status, {message: 'Status must be PENDING, IN_PROGRESS or DONE'})
  status?: Status;

  @ApiPropertyOptional({
    description: 'Title of the task',
    minLength: 3,
    example: 'Buy groceries',
  })
  @IsOptional()
  @IsString()
  @MinLength(3)
  title?: string;
}