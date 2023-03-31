import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './todo.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todosRepository: Repository<Todo>,
  ) {}

  async findAll(): Promise<Todo[]> {
    return this.todosRepository.find();
  }

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const todo = new Todo();
    todo.summary = createTodoDto.summary;

    return this.todosRepository.save(todo);
  }

  async findById(id: number): Promise<Todo | null> {
    return this.todosRepository.findOneBy({ id });
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo | null> {
    const todo = await this.findById(id);
    if (!todo) return null;

    todo.summary = updateTodoDto.summary;
    todo.isComplete = updateTodoDto.isComplete;

    return this.todosRepository.save(todo);
  }

  async remove(id: number): Promise<void> {
    await this.todosRepository.delete(id);
  }
}
