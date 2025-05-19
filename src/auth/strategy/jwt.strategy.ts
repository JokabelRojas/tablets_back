import { Injectable, Logger, Req } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { jwtConstants } from '../../common/constants'
import { Request } from 'express'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'auth-jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([JwtStrategy.stractJwtRequest]),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    })
  }
  private static stractJwtRequest(
    this: void,
    @Req() req: Request,
  ): string | null {
    const coookie = req.headers?.cookie?.split('auth=')[1]
    Logger.debug({
      message: 'AuthJwt.stractJwtRequest',
      coookie,
    })

    return (coookie as string) || null
  }

  validate(payload: { sub: string; email: string; role: string }) {
    console.log({
      payload,
    })

    return payload
  }
}
