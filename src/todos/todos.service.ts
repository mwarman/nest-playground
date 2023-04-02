import { Injectable, Logger } from '@nestjs/common';
import * as _ from 'lodash';

import { Todo } from './interfaces/todo.interface';

@Injectable()
export class TodosService {
  private readonly logger = new Logger(TodosService.name);
  private todos: Todo[] = [];

  findAll(): Todo[] {
    this.logger.log('findAll');
    return this.todos;
  }

  create(todo: Todo): Todo {
    this.logger.log('create');
    const todoToCreate = {
      ...todo,
      id: _.uniqueId(),
    };
    this.todos.push(todoToCreate);
    return todoToCreate;
  }

  findById(id: string): Todo | null {
    this.logger.log('findById');
    return _.find<Todo>(this.todos, { id });
  }

  update(id: string, todo: Todo): Todo | null {
    this.logger.log('update');
    const currentTodo = this.findById(id);
    if (!currentTodo) return null;

    const updatedTodo = {
      ...currentTodo,
      ...todo,
      id,
    };

    const otherTodos = _.reject<Todo>(this.todos, { id });
    this.todos = [...otherTodos, updatedTodo];

    return updatedTodo;
  }

  delete(id: string): void {
    this.logger.log('delete');
    this.todos = _.reject<Todo>(this.todos, { id });
  }
}
