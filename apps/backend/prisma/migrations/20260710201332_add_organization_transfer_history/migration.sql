-- CreateTable
CREATE TABLE "organization_transfer_history" (
    "id" UUID NOT NULL,
    "organization_id" UUID NOT NULL,
    "previous_parent_id" UUID,
    "new_parent_id" UUID,
    "transferred_by" UUID NOT NULL,
    "approved_by" UUID NOT NULL,
    "transferred_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reason" TEXT,

    CONSTRAINT "organization_transfer_history_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "organization_transfer_history" ADD CONSTRAINT "organization_transfer_history_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_transfer_history" ADD CONSTRAINT "organization_transfer_history_transferred_by_fkey" FOREIGN KEY ("transferred_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_transfer_history" ADD CONSTRAINT "organization_transfer_history_approved_by_fkey" FOREIGN KEY ("approved_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
