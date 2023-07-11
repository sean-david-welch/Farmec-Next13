-- DropForeignKey
ALTER TABLE "Machine" DROP CONSTRAINT "Machine_supplierId_fkey";

-- DropForeignKey
ALTER TABLE "PartsRequired" DROP CONSTRAINT "PartsRequired_warrantyId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_machineId_fkey";

-- DropForeignKey
ALTER TABLE "SpareParts" DROP CONSTRAINT "SpareParts_supplierId_fkey";

-- AddForeignKey
ALTER TABLE "Machine" ADD CONSTRAINT "Machine_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_machineId_fkey" FOREIGN KEY ("machineId") REFERENCES "Machine"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpareParts" ADD CONSTRAINT "SpareParts_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartsRequired" ADD CONSTRAINT "PartsRequired_warrantyId_fkey" FOREIGN KEY ("warrantyId") REFERENCES "WarrantyClaim"("id") ON DELETE CASCADE ON UPDATE CASCADE;
