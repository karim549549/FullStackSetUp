import { IsEmail, IsNotEmpty, Matches, IsOptional } from 'class-validator';
import { passwordRegex } from '../../utils/constants/passswordRegex';
export class LoginUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @Matches(passwordRegex, {
    message:
      'Password must have at least 8 characters, one uppercase, one lowercase, one number and one special character',
  })
  password: string;
}

export class CreateUserDto extends LoginUserDto {
  @IsOptional()
  googleId?: string;

  @IsOptional()
  githubId?: string;

  @IsNotEmpty()
  name: string;
}

export class ForgotPasswordDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
