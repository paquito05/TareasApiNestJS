import { PartialType } from '@nestjs/mapped-types';
import { CreateTareasDto } from './create-tareas.dto';

export class UpdateTareasDto extends PartialType(CreateTareasDto) {}
