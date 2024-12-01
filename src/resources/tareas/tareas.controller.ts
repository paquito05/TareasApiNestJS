import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TareasService } from './tareas.service';
import { CreateTareasDto } from './dto/create-tareas.dto';
import { UpdateTareasDto } from './dto/update-tareas.dto';
import { TareasPaginationDto } from './dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('tareas')
export class TareasController {
  constructor(private readonly tareasService: TareasService) {}

  @Get()
  findAll(@Query() tareasPaginationDto: TareasPaginationDto) {
    return this.tareasService.findAll(tareasPaginationDto);
  }

  @Get(':id')
  finOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.tareasService.findOne(id);
  }

  @Post()
  create(@Body() createTareasDto: CreateTareasDto) {
    return this.tareasService.create(createTareasDto);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateTareasDto: UpdateTareasDto) {
    return this.tareasService.update(id, updateTareasDto);
  }
}
