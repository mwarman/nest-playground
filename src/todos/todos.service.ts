import { Injectable } from '@nestjs/common';

export interface Todo {
  id: number;
  summary: string;
  isComplete: boolean;
}

@Injectable()
export class TodosService {
  private readonly todos: Todo[] = [
    {
      id: 1,
      summary: 'Vacuum the carpet',
      isComplete: false,
    },
    {
      id: 2,
      summary: 'Wash the car',
      isComplete: true,
    },
  ];

  async findAll(): Promise<Todo[]> {
    return this.todos;
  }

  async findById(id: number): Promise<Todo | undefined> {
    return this.todos.find((todo) => todo.id === id);
  }
}
