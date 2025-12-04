/*
  Warnings:

  - You are about to drop the `barbeiros` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "agendamentos" DROP CONSTRAINT "agendamentos_barbeiroId_fkey";

-- DropForeignKey
ALTER TABLE "barbeiros" DROP CONSTRAINT "barbeiros_barbeariaId_fkey";

-- AlterTable
ALTER TABLE "usuarios" ADD COLUMN     "especialidade" TEXT,
ALTER COLUMN "senha_hash" DROP NOT NULL;

-- DropTable
DROP TABLE "barbeiros";

-- AddForeignKey
ALTER TABLE "agendamentos" ADD CONSTRAINT "agendamentos_barbeiroId_fkey" FOREIGN KEY ("barbeiroId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;
