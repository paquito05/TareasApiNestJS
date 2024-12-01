import { TareasEstado } from '@prisma/client';
import {
  IsAlpha,
  IsDate,
  IsEnum,
  IsOptional,
  IsString,
  Max,
  MaxLength,
} from 'class-validator';
import { TareasEstadoList } from '../enum/tareas.enum';
import { Transform } from 'class-transformer';

export class CreateTareasDto {
  @IsString()
  readonly icono: string;

  @IsString()
  readonly titulo: string;

  @MaxLength(200, {
    message: 'El maximo de caracteres es 50',
  })
  readonly texto: string;

  @IsEnum(TareasEstadoList, {
    message: `Posible valores para el estado son ${TareasEstadoList}`,
  })
  @IsOptional()
  readonly tareasEstado: TareasEstado = TareasEstado.PENDIENTE;

  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  @IsDate({ message: 'fechaLimite es invalida' })
  readonly fechaLimite: Date;
}
