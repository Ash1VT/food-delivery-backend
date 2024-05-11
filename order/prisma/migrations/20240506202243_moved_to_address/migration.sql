/*
  Warnings:

  - You are about to drop the column `address_id` on the `restaurants` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[restaurant_id]` on the table `addresses` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "restaurants" DROP CONSTRAINT "restaurants_address_id_fkey";

-- DropIndex
DROP INDEX "restaurants_address_id_key";

-- AlterTable
ALTER TABLE "addresses" ADD COLUMN     "restaurant_id" BIGINT;

-- AlterTable
ALTER TABLE "restaurants" DROP COLUMN "address_id";

-- CreateIndex
CREATE UNIQUE INDEX "addresses_restaurant_id_key" ON "addresses"("restaurant_id");

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE SET NULL ON UPDATE CASCADE;
