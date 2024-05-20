/*
  Warnings:

  - You are about to drop the column `promotion_id` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the `promotions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_promotion_id_fkey";

-- AlterTable
ALTER TABLE "deliveries_information" ALTER COLUMN "origin_address" DROP NOT NULL;

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "promotion_id",
ADD COLUMN     "promotionId" BIGINT,
ALTER COLUMN "status" SET DEFAULT 'PLACING';

-- DropTable
DROP TABLE "promotions";
