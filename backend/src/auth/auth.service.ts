
import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

import { UsersService } from '../users/users.service.js';
import type { RegisterDto } from './dto/register.dto.js';
import type { RegisterResponseDto } from './dto/register-response.dto.js';

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
	) {}

	async register(
		dto: RegisterDto,
	): Promise<RegisterResponseDto> {
		const passwordHash = await argon2.hash(
			dto.password,
			{
				type: argon2.argon2id,
				memoryCost: 19456,
				timeCost: 2,
				parallelism: 1,
			},
		);

		const user = await this.usersService.create({
			username: dto.username.toLowerCase(),
			email: dto.email.toLowerCase(),
			passwordHash,
		});

		return {
			id: user.id,
			username: user.username,
			email: user.email,
			createdAt: user.createdAt,
		};
	}
}
