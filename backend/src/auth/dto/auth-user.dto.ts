import type { User } from '../../users/entities/user.entity.js';

export interface AuthUserDto {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
}

export function toAuthUser(user: User): AuthUserDto {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    createdAt: user.createdAt,
  };
}
