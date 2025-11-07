import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {

    const requiredPermissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );

    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true; // No se requiere permiso específico
    }

    const request = context.switchToHttp().getRequest();
    //console.log('PermissionsGuard: request', request.user);
    const user = request.user;

    const userPermissions: string[] = String(user?.permission ).split(',')
    .map((p: string) => p.trim().replace(/^'(.*)'$/, '$1'));

    const hasPermission = requiredPermissions.every(permission =>
      userPermissions.includes(permission),
    );

    if (!hasPermission) {
      throw new ForbiddenException('No tienes permisos suficientes.');
    }

    return true;
  }
}