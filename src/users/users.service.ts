import { Injectable } from '@nestjs/common';

import { User } from './interfaces/user.interface';
import { Role } from 'src/auth/auth.constants';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
      roles: [Role.User],
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
      roles: [Role.Admin, Role.User],
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async findById(id: number): Promise<User | undefined> {
    return this.users.find((user) => user.userId === id);
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }
}
