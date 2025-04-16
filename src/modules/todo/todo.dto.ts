import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';

export enum TodoStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  IN_PROGRESS = 'in_progress',
}

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(TodoStatus)
  @IsOptional()
  status?: TodoStatus;

  createdAt?: Date;
  updatedAt?: Date;
}

export class UpdateTodoDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(TodoStatus)
  @IsOptional()
  status?: TodoStatus;

  updatedAt?: Date;
}
