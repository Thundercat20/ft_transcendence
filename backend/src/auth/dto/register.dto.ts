import {
	IsEmail,
	IsString,
	Length,
	Matches,
	MaxLength,
	MinLength,
} from 'class-validator';

export class RegisterDto {
	@IsString()
	@Length(3, 32)
	@Matches(/^[a-zA-Z0-9_]+$/, {
		message:
		'Username can only contain letters, numbers and underscores',
	})
	username!: string;

	@IsString()
	@IsEmail()
	@MaxLength(254)
	email!: string;

	@IsString()
	@MinLength(12)
	@MaxLength(128)
	password!: string;
}
