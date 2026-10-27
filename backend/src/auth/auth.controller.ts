
import {
	Body,
	Controller,
	Post,
} from '@nestjs/common';

import { AuthService } from './auth.service.js';
import { RegisterDto } from './dto/register.dto.js';
import type { RegisterResponseDto } from './dto/register-response.dto.js';

@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
	) {}

	@Post('register')
	register(
		@Body() dto: RegisterDto,
	): Promise<RegisterResponseDto> {
		return this.authService.register(dto);
	}
}
