import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { PrismaClient, Role, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { BcryptService } from 'src/common/service/bcrypt/bcrypt.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerUserDto: RegisterUserDto) {
    if (
      await this.prismaService.user.findFirst({
        where: { username: registerUserDto.username },
      })
    ) {
      throw new BadRequestException('Ya existe un usuario con ese username');
    }

    if (
      await this.prismaService.user.findFirst({
        where: { email: registerUserDto.email },
      })
    ) {
      throw new BadRequestException('Ya existe un usuario con ese email');
    }

    let passwordHash: string = '';

    try {
      passwordHash = await this.bcryptService.hash(registerUserDto.password);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException('Error hashing password');
    }

    const defaultRole = await this.findDefaultRole();

    try {
      const userSave = await this.prismaService.user.create({
        data: {
          email: registerUserDto.email,
          username: registerUserDto.username,
          password: passwordHash,
          role_id: defaultRole.id,
        },
        include: {
          role: true,
        },
      });

      const accessToken = await this.getAccessToken(userSave, userSave.role);

      const { password, ...userWithoutPassword } = userSave;

      return {
        user: userWithoutPassword,
        accessToken: accessToken,
      };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Error al guardar el usuario');
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const userFound = await this.prismaService.user.findFirst({
      where: { email: loginUserDto.email },
      include: {
        role: true,
      },
    });

    if (!userFound) {
      throw new NotFoundException('No existe un usuario con ese email');
    }

    let passwordMatch = false;
    try {
      passwordMatch = await this.bcryptService.isMatch(
        loginUserDto.password,
        userFound.password,
      );
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Error al comprobar password');
    }

    if (!passwordMatch) {
      throw new BadRequestException('Contraseña incorrecta');
    }

    const accessToken = await this.getAccessToken(userFound, userFound.role);

    const { password, ...userWithoutPassword } = userFound;

    return {
      user: userWithoutPassword,
      accessToken: accessToken,
    };
  }

  private async findDefaultRole(defaultRole: string = 'USER') {
    try {
      return await this.prismaService.role.findFirst({
        where: { name: defaultRole },
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        'Error al buscar el rol por defecto',
      );
    }
  }

  private async getAccessToken(user: User, role: Role) {
    try {
      const payload = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: role.name,
      };

      return this.jwtService.sign(payload);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Error al generar el token');
    }
  }
}
