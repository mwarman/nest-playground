import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';

import { Todo } from './interfaces/todo.interface';

@Injectable()
export class TodosService {
  private todos: Todo[] = [];

  findAll(): Todo[] {
    return this.todos;
  }

  create(todo: Todo): Todo {
    const todoToCreate = {
      ...todo,
      id: _.uniqueId('TODO-'),
    };
    this.todos.push(todoToCreate);
    return todoToCreate;
  }

  findById(id: string): Todo | null {
    return _.find<Todo>(this.todos, { id });
  }

  update(id: string, todo: Todo): Todo | null {
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
    this.todos = _.reject<Todo>(this.todos, { id });
  }
}
