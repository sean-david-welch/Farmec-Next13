-- CreateTable
CREATE TABLE "Carousel" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "image" TEXT DEFAULT '/default.jpg',
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Carousel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Carousel_name_key" ON "Carousel"("name");
