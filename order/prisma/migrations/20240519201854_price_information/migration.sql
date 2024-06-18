/*
  Warnings:

  - You are about to drop the column `delivery_price` on the `deliveries_information` table. All the data in the column will be lost.
  - You are about to drop the column `decounted_price` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `promocode_discount` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `promocode_name` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `total_price` on the `orders` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[price_information_id]` on the table `orders` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `price_information_id` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "order_statuses" ADD VALUE 'PLACING';

-- AlterTable
ALTER TABLE "deliveries_information" DROP COLUMN "delivery_price";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "decounted_price",
DROP COLUMN "promocode_discount",
DROP COLUMN "promocode_name",
DROP COLUMN "total_price",
ADD COLUMN     "price_information_id" BIGINT NOT NULL;

-- CreateTable
CREATE TABLE "PriceInformation" (
    "id" BIGSERIAL NOT NULL,
    "order_items_price" DOUBLE PRECISION NOT NULL,
    "promocode_name" TEXT,
    "promocode_discount" INTEGER,
    "decounted_price" DOUBLE PRECISION NOT NULL,
    "delivery_price" DOUBLE PRECISION NOT NULL,
    "total_price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "PriceInformation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "orders_price_information_id_key" ON "orders"("price_information_id");

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_price_information_id_fkey" FOREIGN KEY ("price_information_id") REFERENCES "PriceInformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
