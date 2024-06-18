/*
  Warnings:

  - The values [CONFIRMED] on the enum `order_statuses` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "customers_addresses_approval_status" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterEnum
BEGIN;
CREATE TYPE "order_statuses_new" AS ENUM ('PENDING', 'PREPARING', 'READY', 'DELIVERING', 'DELIVERED', 'CANCELLED');
ALTER TABLE "orders" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "orders" ALTER COLUMN "status" TYPE "order_statuses_new" USING ("status"::text::"order_statuses_new");
ALTER TYPE "order_statuses" RENAME TO "order_statuses_old";
ALTER TYPE "order_statuses_new" RENAME TO "order_statuses";
DROP TYPE "order_statuses_old";
ALTER TABLE "orders" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- AlterTable
ALTER TABLE "customers_addresses" ADD COLUMN     "is_approved" "customers_addresses_approval_status" NOT NULL DEFAULT 'PENDING';
