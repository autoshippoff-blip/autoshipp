-- CreateEnum
CREATE TYPE "SyncStatus" AS ENUM ('IDLE', 'IN_PROGRESS', 'PAUSED', 'FAILED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "SyncEntityType" AS ENUM ('ORDER', 'PRODUCT');

-- CreateTable
CREATE TABLE "commerce_sync_checkpoints" (
    "id" UUID NOT NULL,
    "organization_id" UUID NOT NULL,
    "store_id" UUID NOT NULL,
    "entity_type" "SyncEntityType" NOT NULL DEFAULT 'ORDER',
    "next_cursor" TEXT,
    "pages_processed" INTEGER NOT NULL DEFAULT 0,
    "records_processed" INTEGER NOT NULL DEFAULT 0,
    "status" "SyncStatus" NOT NULL DEFAULT 'IDLE',
    "last_error" TEXT,
    "last_checkpoint_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "commerce_sync_checkpoints_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "commerce_sync_checkpoints_store_id_key" ON "commerce_sync_checkpoints"("store_id");

-- CreateIndex
CREATE INDEX "commerce_sync_checkpoints_organization_id_idx" ON "commerce_sync_checkpoints"("organization_id");

-- AddForeignKey
ALTER TABLE "commerce_sync_checkpoints" ADD CONSTRAINT "commerce_sync_checkpoints_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commerce_sync_checkpoints" ADD CONSTRAINT "commerce_sync_checkpoints_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE CASCADE ON UPDATE CASCADE;
