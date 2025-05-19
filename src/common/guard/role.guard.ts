import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Request } from 'express'
import { Role, ROLES_KEY } from '../decorators/roles.decorator'
import { CustomerUserData } from '../types/customer.user'

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>()

    const user = request.user as CustomerUserData
    if (!user) throw new ForbiddenException('No se ha encontrado el usuario')
    const roles = this.getRoles(context)
    this.verifyRoles(user, roles)
    return true
  }

  private verifyRoles(customerUserPayload: CustomerUserData, roles: Role[]) {
    const { role: customerRole } = customerUserPayload
    const roleVerify = roles.some((role) => role === customerRole)
    if (!roleVerify)
      throw new ForbiddenException(`No tienes acceso a esta funcionalidad`)
    return true
  }

  private getRoles(context: ExecutionContext): Role[] {
    return this.reflector.get<string[]>(
      ROLES_KEY,
      context.getHandler(),
    ) as Role[]
  }
}
