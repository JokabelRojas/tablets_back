import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { Response } from 'express'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken } = await this.authService.login(loginDto)
    const isProduction = process.env.NODE_ENV === 'production'
    res.cookie('auth', accessToken, {
      sameSite: isProduction ? 'none' : 'lax',
      secure: isProduction,
      httpOnly: true,
    })
    res.send({
      message: 'Login exitoso',
      status: HttpStatus.OK,
      auth: accessToken,
    })
  }
}
