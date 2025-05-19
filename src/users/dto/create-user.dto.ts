import { IsString, IsEmail, MinLength, IsEnum } from 'class-validator'
import { UserRole } from 'src/common/decorators/roles.decorator'

export class CreateUserDto {
  @IsString()
  firstName: string

  @IsString()
  lastName: string

  @IsEmail()
  email: string

  @IsString()
  @MinLength(6)
  password: string

  @IsEnum(UserRole)
  role: UserRole
}
