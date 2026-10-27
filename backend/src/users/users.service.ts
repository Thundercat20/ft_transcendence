
import {
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  QueryFailedError,
  type Repository,
} from 'typeorm';

import { User } from './entities/user.entity.js';

export type CreateUserInput = {
  username: string;
  email: string;
  passwordHash: string;
};

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(input: CreateUserInput): Promise<User> {
    const user = this.usersRepository.create(input);

    try {
      return await this.usersRepository.save(user);
    } catch (error: unknown) {
      if (error instanceof QueryFailedError) {
        const driverError: unknown = error.driverError;

        if (
          typeof driverError === 'object' &&
          driverError !== null &&
          'code' in driverError &&
          driverError.code === '23505'
        ) {
          throw new ConflictException(
            'Username or email already in use',
          );
        }
      }

      throw error;
    }
  }
}
