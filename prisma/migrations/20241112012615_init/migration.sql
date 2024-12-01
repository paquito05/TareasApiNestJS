/*
  Warnings:

  - Changed the type of `fechaLimite` on the `Tareas` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Tareas" DROP COLUMN "fechaLimite",
ADD COLUMN     "fechaLimite" TIMESTAMP(3) NOT NULL;
