import { IsString, IsEmail, MinLength, IsEnum } from 'class-validator';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsEnum(UserRole)
  role: UserRole;
}
