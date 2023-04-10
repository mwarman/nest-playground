import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from './todos.controller';
import { Todo, TodosService } from './todos.service';

describe('TodosController', () => {
  let todosController: TodosController;
  let todosService: TodosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [TodosService],
    }).compile();

    todosController = module.get<TodosController>(TodosController);
    todosService = module.get<TodosService>(TodosService);
  });

  it('should be defined', () => {
    expect(todosController).toBeDefined();
    expect(todosService).toBeDefined();
  });

  describe('findAll', () => {
    // test fixture data
    const todos: Todo[] = [
      { id: 1, summary: 'test the app', isComplete: false },
    ];

    it('should return a collection of todos', async () => {
      // set up
      jest.spyOn(todosService, 'findAll').mockResolvedValue(todos);

      // execute
      const result = await todosController.findAll();

      // assert
      expect(result).toBe(todos);
    });
  });
});
