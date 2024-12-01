import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { envs } from 'src/config';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // el token como barer token
      ignoreExpiration: false, // ignora la expiracion
      // La clave secreta
      secretOrKey: Buffer.from(envs.private_key, 'utf-8').toString('base64'),
    });
  }

  // Si se valida obtenemos el role
  async validate(payload: User) {
    // console.log(payload)
    return {
      id: payload.id,
      username: payload.username,
      email: payload.email,
    };
  }
}
