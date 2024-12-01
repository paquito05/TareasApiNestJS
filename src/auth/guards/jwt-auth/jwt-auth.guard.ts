import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Puedes ejecutar lógica adicional aquí si lo necesitas
    const request = context.switchToHttp().getRequest();

    // Ejemplo: verifica si un header custom está presente antes de validar el token
    if (!request.headers['authorization']) {
      throw new UnauthorizedException(
        'El token de autenticación no ha sido enviado en los headers de la solicitud. Asegúrate de incluir un token válido en el campo "Authorization" con el formato Bearer <token>. Esta acción es requerida para acceder a los recursos protegidos.',
      );
    }

    // Llama al método original de AuthGuard para manejar el flujo del token
    return (await super.canActivate(context)) as boolean;
  }

  handleRequest(err, user, info, context) {
    if (err || !user) {
      // Personaliza el mensaje de error del token
      throw new UnauthorizedException(
        'El token enviado es inválido o ha expirado. Por favor, verifica que el token sea correcto y no esté caducado antes de realizar esta solicitud.',
      );
    }
    return user; // Retorna el usuario autenticado
  }
}
