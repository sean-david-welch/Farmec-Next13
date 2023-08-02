/*
  Warnings:

  - You are about to drop the column `description` on the `SpareParts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SpareParts" DROP COLUMN "description",
ADD COLUMN     "pdf_link" TEXT;
