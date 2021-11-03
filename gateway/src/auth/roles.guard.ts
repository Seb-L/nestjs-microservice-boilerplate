import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!roles) {
      return true;
    } else if (roles.includes('admin') && user.email === 'admin@toto.com') {
      return true;
    } else if (roles.includes('user')) {
      return true;
    } else {
      throw new UnauthorizedException();
    }
  }
}
