import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Status } from "../enums/status.enum";

@Entity('tasks')
export class Task {
  @ApiProperty({ 
    example     : '89035c76-00ed-4e56-ad8f-4d26f7ce3ea1',
    description : 'Unique identifier of the task',
  })  
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example     : 'Clean the house',
    description : 'Title of the task',
  })  
  @Column('text')
  title: string;

  @ApiPropertyOptional({ 
    example     : 'I will start cleaning at 4',
    description : 'Detailed description of the task',
    default     : null,
  })  
  @Column('text', {nullable: true})
  description?: string;

  @ApiProperty({
    example     : Status.PENDING,
    description : 'Current status of the task',
    enum        : Status,
    default     : Status.PENDING,
  })  
  @Column('enum', {enum: Status, default: Status.PENDING})
  status: Status;

  @ApiProperty({
    description : 'Date when the task was created',
    example     : '2025-11-08T19:20:00.000Z',
  }) 
  @CreateDateColumn()
  createdAt: Date;
}