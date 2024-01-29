/*
  Warnings:

  - You are about to drop the column `promocode_id` on the `orders` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_promocode_id_fkey";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "promocode_id",
ADD COLUMN     "promocode_discount" INTEGER,
ADD COLUMN     "promocode_name" TEXT;
