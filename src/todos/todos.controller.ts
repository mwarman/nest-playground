import {
  Body,
  CACHE_MANAGER,
  CacheInterceptor,
  Controller,
  Delete,
  Get,
  Inject,
  Logger,
  NotFoundException,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';

import { TodosService } from './todos.service';
import { Todo } from './interfaces/todo.interface';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Cache } from 'cache-manager';

@Controller('todos')
@UseInterceptors(CacheInterceptor)
export class TodosController {
  private readonly logger = new Logger(TodosController.name);

  constructor(
    private todosService: TodosService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  /**
   * Deletes cached items whose `key` starts with the supplied `keyPrefix`.
   * @param keyPrefix {string} - Prefix for cache keys to be deleted.
   */
  async clearCache(keyPrefix: string): Promise<void> {
    const keys = await this.cacheManager.store.keys();
    this.logger.log(`clearCache::prefix::${keyPrefix}::cached keys::${keys}`);
    const promises = [];
    keys.forEach((key) => {
      if (key.startsWith(keyPrefix)) {
        promises.push(this.cacheManager.del(key));
      }
    });
    await Promise.all(promises);
  }

  @Get()
  findAll(): Todo[] {
    this.logger.log('findAll');
    return this.todosService.findAll();
  }

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    this.logger.log('create');
    const todo = this.todosService.create(createTodoDto);
    await this.clearCache(`/todos`);
    return todo;
  }

  @Get(':id')
  findById(@Param('id') id: string): Todo | null {
    this.logger.log('findById');
    const todo = this.todosService.findById(id);
    if (todo) {
      return todo;
    } else {
      throw new NotFoundException();
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ): Promise<Todo> {
    this.logger.log('update');
    const todo = this.todosService.update(id, updateTodoDto);
    if (todo) {
      await this.clearCache(`/todos`);
      return todo;
    } else {
      throw new NotFoundException();
    }
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string): Promise<void> {
    this.logger.log('deleteById');
    this.todosService.delete(id);
    this.clearCache(`/todos`);
  }
}
