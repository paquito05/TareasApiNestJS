import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { CreateTareasDto } from './dto/create-tareas.dto';
import { UpdateTareasDto } from './dto/update-tareas.dto';
import { TareasPaginationDto } from './dto/tareas-pagination.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TareasService {
  private readonly logger = new Logger('TareasService');

  constructor(private readonly prismaService: PrismaService) {}

  async findAll(tareasPaginationDto: TareasPaginationDto) {
    const {
      page: currentPage,
      limit: perPage,
      estado: estado,
    } = tareasPaginationDto;

    const totalPages = await this.prismaService.tareas.count({
      where: {
        tareasEstado: estado,
      },
    });

    const lastpage = Math.ceil(totalPages / perPage);

    return {
      meta: {
        total: totalPages,
        page: currentPage,
        lastpage: lastpage,
      },
      data: await this.prismaService.tareas.findMany({
        skip: (currentPage - 1) * perPage,
        take: perPage,
        where: {
          tareasEstado: estado,
        },
      }),
    };
  }

  async findOne(id: string) {
    const tarea = await this.prismaService.tareas.findFirst({
      where: { id },
    });

    if (!tarea) {
      throw new HttpException(
        `La tarea con el id ${id} no se encontro`,
        HttpStatus.NOT_FOUND,
      );
    }

    return tarea;
  }

  create(createTareasDto: CreateTareasDto) {
    return this.prismaService.tareas.create({
      data: createTareasDto,
    });
  }

  async update(id: string, updateTareasDto: UpdateTareasDto) {
    const tareas = await this.findOne(id);

    if (!tareas) {
      throw new HttpException(
        'No se encontro la tarea con ese id',
        HttpStatus.NOT_FOUND,
      );
    }

    return this.prismaService.tareas.update({
      where: { id },
      data: updateTareasDto,
    });
  }
}
