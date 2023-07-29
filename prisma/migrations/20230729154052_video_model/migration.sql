-- CreateTable
CREATE TABLE "Video" (
    "id" TEXT NOT NULL,
    "supplierId" TEXT NOT NULL,
    "web_url" TEXT,
    "title" TEXT,
    "description" TEXT,
    "video_id" TEXT,
    "thumbnail_url" TEXT,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE CASCADE ON UPDATE CASCADE;
