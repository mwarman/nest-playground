import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';

import { TodosService } from './todos.service';
import { Todo } from './interfaces/todo.interface';
import { CreateTodoDto, createTodoSchema } from './dto/create-todo.dto';
import { UpdateTodoDto, updateTodoSchema } from './dto/update-todo.dto';
import { JoiValidationPipe } from 'src/pipes/joi-validation.pipe';

@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Get()
  findAll(): Todo[] {
    return this.todosService.findAll();
  }

  @Post()
  @UsePipes(new JoiValidationPipe(createTodoSchema))
  create(@Body() createTodoDto: CreateTodoDto): Todo {
    return this.todosService.create(createTodoDto);
  }

  @Get(':id')
  findById(@Param('id') id: string): Todo | null {
    const todo = this.todosService.findById(id);
    if (todo) {
      return todo;
    } else {
      throw new NotFoundException();
    }
  }

  @Put(':id')
  @UsePipes(new JoiValidationPipe(updateTodoSchema))
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto): Todo {
    const todo = this.todosService.update(id, updateTodoDto);
    if (todo) {
      return todo;
    } else {
      throw new NotFoundException();
    }
  }

  @Delete(':id')
  deleteById(@Param('id') id: string): void {
    this.todosService.delete(id);
  }
}
