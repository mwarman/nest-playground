import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TodosModule } from './../src/todos/todos.module';
import { TodosService } from './../src/todos/todos.service';

describe('Todos', () => {
  let app: INestApplication;
  let todosService = { findAll: () => ['test'], findById: () => 'test' };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TodosModule],
    })
      .overrideProvider(TodosService)
      .useValue(todosService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /todos', () => {
    return request(app.getHttpServer())
      .get('/todos')
      .expect(200)
      .expect(todosService.findAll());
  });

  it('GET /todos/:id', () => {
    return request(app.getHttpServer())
      .get('/todos/1')
      .expect(200)
      .expect(todosService.findById);
  });
});
