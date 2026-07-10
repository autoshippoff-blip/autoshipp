-- Create partial unique index to enforce D-166 (Single Active Parent Invariant)
-- A given child organization can have at most ONE active parent per relationship_type.
CREATE UNIQUE INDEX "organization_relationships_child_type_active_key" 
ON "organization_relationships"("child_organization_id", "relationship_type") 
WHERE "active" = true;

-- Note for rollback:
-- DROP INDEX IF EXISTS "organization_relationships_child_type_active_key";