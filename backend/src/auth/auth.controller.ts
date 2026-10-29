import {
	Body,
	Controller,
	Post,
	Get,
	HttpCode,
	HttpStatus,
	Req,
	Res,
	UnauthorizedException,
} from '@nestjs/common';

import type {
  Request,
  Response,
} from 'express';

import { SessionService } from './session.service.js';
import { LoginDto } from './dto/login.dto.js';
import { toAuthUser, type AuthUserDto } from './dto/auth-user.dto.js';
import { UsersService } from '../users/users.service.js';

import { AuthService } from './auth.service.js';
import { RegisterDto } from './dto/register.dto.js';
import type { RegisterResponseDto } from './dto/register-response.dto.js';

@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly sessionService: SessionService,
		private readonly usersService: UsersService,
	) {}

	@Post('register')
	register(@Body() dto: RegisterDto): Promise<RegisterResponseDto> {
		return this.authService.register(dto);
	}
	
	@Post('login')
	@HttpCode(HttpStatus.OK)
	async login(@Body() dto: LoginDto,	@Req() request: Request ): Promise<AuthUserDto> {
		const user = await this.authService.validateCredentials(dto);

		await this.sessionService.start(request, user.id);

		return toAuthUser(user);
	}

	@Get('me')
	async me( @Req() request: Request ): Promise<AuthUserDto> {
		const userId = request.session.userId;

		if (!userId) {
			throw new UnauthorizedException();
		}

		const user = await this.usersService.findById(userId);

		if (!user) {
			throw new UnauthorizedException();
		}

		return toAuthUser(user);
	}

	@Post('logout')
	@HttpCode(HttpStatus.NO_CONTENT)
	async logout( @Req() request: Request, @Res({ passthrough: true }) response: Response ): Promise<void> {
		await this.sessionService.end(request);

		response.clearCookie('ft.sid', {
			path: '/',
			sameSite: 'lax',
			secure: process.env['NODE_ENV'] === 'production',
		});
	}

}
