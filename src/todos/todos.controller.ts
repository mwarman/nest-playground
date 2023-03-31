import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Logger } from '@nestjs/common';

import { TodosService } from './todos.service';
import { Todo } from './todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todos')
export class TodosController {
  private readonly logger = new Logger(TodosController.name);

  constructor(private readonly todosService: TodosService) {}

  @Get()
  findAll(): Promise<Todo[]> {
    this.logger.log('findAll');
    return this.todosService.findAll();
  }

  @Post()
  create(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    this.logger.log('create');
    return this.todosService.create(createTodoDto);
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Todo> {
    this.logger.log('findById');
    const todo = await this.todosService.findById(id);

    if (todo) {
      return todo;
    } else {
      throw new NotFoundException();
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateTodoDto: UpdateTodoDto,
  ): Promise<Todo> {
    this.logger.log('update');
    const todo = await this.todosService.update(id, updateTodoDto);

    if (todo) {
      return todo;
    } else {
      throw new NotFoundException();
    }
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    this.logger.log('delete');
    return this.todosService.remove(id);
  }
}
