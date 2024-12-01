import { TareasEstado } from "@prisma/client";
import { IsEnum, IsOptional } from "class-validator";
import { PaginationDto } from "src/common";
import { TareasEstadoList } from "../enum/tareas.enum";

export class TareasPaginationDto extends PaginationDto{

    @IsOptional()
    @IsEnum( TareasEstadoList, {
        message: `Los estado validos son ${TareasEstadoList}`
    })
    readonly estado: TareasEstado
}