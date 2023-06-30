-- AlterTable
ALTER TABLE "Machine" ALTER COLUMN "machine_image" SET DEFAULT '/default.jpg';

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "product_image" SET DEFAULT '/default.jpg';

-- AlterTable
ALTER TABLE "SpareParts" ALTER COLUMN "parts_image" SET DEFAULT '/default.jpg';

-- AlterTable
ALTER TABLE "Supplier" ALTER COLUMN "logo_image" SET DEFAULT '/default.jpg',
ALTER COLUMN "marketing_image" SET DEFAULT '/default.jpg';

-- CreateTable
CREATE TABLE "Employee" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "role" TEXT,
    "bio" TEXT,
    "profile_image" TEXT DEFAULT '/default.jpg',
    "social_twitter" TEXT,
    "social_linkedin" TEXT,
    "social_whatsapp" TEXT,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Timeline" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "date" TEXT,
    "body" TEXT,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Timeline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Terms" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "body" TEXT,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Terms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Privacy" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "body" TEXT,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Privacy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Blog" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "date" TEXT,
    "main_image" TEXT DEFAULT '/default.jpg',
    "subheading" TEXT,
    "body" TEXT,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exhibition" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "date" TEXT,
    "location" TEXT,
    "info" TEXT,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Exhibition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentProduct" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "price" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "image" TEXT DEFAULT '/default.jpg',

    CONSTRAINT "PaymentProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WarrantyClaim" (
    "id" TEXT NOT NULL,
    "dealer" TEXT,
    "dealer_contact" TEXT,
    "owner_name" TEXT,
    "machine_model" TEXT,
    "serial_number" TEXT,
    "install_date" TEXT,
    "failure_date" TEXT,
    "repair_date" TEXT,
    "failure_details" TEXT,
    "repair_details" TEXT,
    "labour_hours" TEXT,
    "completed_by" TEXT,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WarrantyClaim_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PartsRequired" (
    "id" TEXT NOT NULL,
    "warrantyId" TEXT NOT NULL,
    "part_number" TEXT,
    "quantity_needed" TEXT DEFAULT '1',
    "invoice_number" TEXT,
    "description" TEXT,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PartsRequired_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MachineRegistration" (
    "id" TEXT NOT NULL,
    "dealer_name" TEXT,
    "dealer_address" TEXT,
    "owner_name" TEXT,
    "owner_address" TEXT,
    "machine_model" TEXT,
    "serial_number" TEXT,
    "install_date" TEXT,
    "invoice_number" TEXT,
    "complete_supply" BOOLEAN NOT NULL DEFAULT false,
    "pdi_complete" BOOLEAN NOT NULL DEFAULT false,
    "pto_correct" BOOLEAN NOT NULL DEFAULT false,
    "machine_test_run" BOOLEAN NOT NULL DEFAULT false,
    "safety_induction" BOOLEAN NOT NULL DEFAULT false,
    "operator_handbook" BOOLEAN NOT NULL DEFAULT false,
    "date" TEXT,
    "completed_by" TEXT,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MachineRegistration_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PartsRequired" ADD CONSTRAINT "PartsRequired_warrantyId_fkey" FOREIGN KEY ("warrantyId") REFERENCES "WarrantyClaim"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
