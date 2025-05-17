import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { verifyPassword } from 'src/common/encrypt'
import { UsersService } from '../users/users.service'
import { LoginDto } from './dto/login.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private async validateUser(loginDto: LoginDto) {
    const { email, password: pass } = loginDto
    const user = await this.usersService.findByEmail(email)

    const userIsValid = user && (await verifyPassword(user.password, pass))
    if (!userIsValid) throw new BadRequestException('Credenciales incorrectas')
    const { _id, email: emailUser, role } = user
    return {
      user_id: String(_id),
      emailUser,
      role,
    }
  }

  private async getToken(payload: {
    email: string
    role: string
    user_id: string
  }) {
    return await this.jwtService.signAsync(payload)
  }

  async login(loginDto: LoginDto) {
    const { emailUser, role, user_id } = await this.validateUser(loginDto)
    const accessToken = await this.getToken({
      email: emailUser,
      role,
      user_id,
    })

    return {
      message: 'Login exitoso',
      status: HttpStatus.OK,
      accessToken,
    }
  }
}
