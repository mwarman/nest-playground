import { Role } from 'src/auth/auth.constants';

export interface User {
  userId: number;
  username: string;
  password: string;
  roles: Role[];
}
