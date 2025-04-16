import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto, UpdateTodoDto } from './todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  //Gọi tới các phương thức trong service qua api

  //Lấy tất cả nhiệm vụ
  @Get()
  async getAll() {
    return this.todoService.findAll();
  }
  //Lấy nhiệm vụ theo id
  @Get('/:id')
  async getOne(@Param('id') id: string) {
    return this.todoService.findOne(id);
  }
  //Thêm nhiệm vụ
  @Post()
  create(@Body(new ValidationPipe()) user: CreateTodoDto) {
    return this.todoService.create(user);
  }
  //Cập nhật thông tin nhiệm vụ
  @Post('/:id')
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) user: UpdateTodoDto,
  ) {
    return this.todoService.update(id, user);
  }
  //Xóa nhiệm vụ
  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.todoService.delete(id);
  }
}
