/*
  Warnings:

  - You are about to drop the column `isActive` on the `restaurants` table. All the data in the column will be lost.
  - You are about to drop the `addresses` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `address` to the `restaurants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_active` to the `restaurants` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "addresses" DROP CONSTRAINT "addresses_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "addresses" DROP CONSTRAINT "addresses_restaurant_id_fkey";

-- AlterTable
ALTER TABLE "restaurants" DROP COLUMN "isActive",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "is_active" BOOLEAN NOT NULL;

-- DropTable
DROP TABLE "addresses";

-- CreateTable
CREATE TABLE "customers_addresses" (
    "id" BIGSERIAL NOT NULL,
    "country" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "customer_id" BIGINT NOT NULL,

    CONSTRAINT "customers_addresses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "customers_addresses" ADD CONSTRAINT "customers_addresses_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
