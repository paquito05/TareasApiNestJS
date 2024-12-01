-- CreateEnum
CREATE TYPE "TareasEstado" AS ENUM ('COMPLETADO', 'EN_CURSO', 'PENDIENTE');

-- CreateTable
CREATE TABLE "Tareas" (
    "id" TEXT NOT NULL,
    "icono" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "texto" TEXT NOT NULL,
    "tareasEstado" "TareasEstado" NOT NULL,
    "fechaLimite" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tareas_pkey" PRIMARY KEY ("id")
);
