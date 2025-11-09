import { IsEnum, IsOptional, IsString, MinLength } from "class-validator";
import { Status } from "../enums/status.enum";
import { Transform } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateTaskDto {
  @ApiProperty({
    description: 'Title of the task',
    minLength: 3,
    example: 'Buy groceries',
  })
  @IsString()
  @MinLength(3)
  title: string;

  @ApiPropertyOptional({
    description: 'Detailed description of the task',
    example: 'Buy milk, bread, and eggs from the supermarket',
  })
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Current status of the task',
    required: false,
    enum: Status,
    example: 'PENDING',
    default: Status.PENDING,
  })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => typeof value === 'string' ? value.toUpperCase() : value)
  @IsEnum(Status, {message: 'Status must be PENDING, IN_PROGRESS or DONE'})
  status?: Status;
}