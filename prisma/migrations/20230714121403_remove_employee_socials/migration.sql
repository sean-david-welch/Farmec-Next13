/*
  Warnings:

  - You are about to drop the column `social_linkedin` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `social_twitter` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `social_whatsapp` on the `Employee` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "social_linkedin",
DROP COLUMN "social_twitter",
DROP COLUMN "social_whatsapp",
ADD COLUMN     "phone" TEXT;
