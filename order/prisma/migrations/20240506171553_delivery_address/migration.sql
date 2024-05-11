/*
  Warnings:

  - You are about to drop the column `actual_delivery_time` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `delivery_accepted_at` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `delivery_finished_at` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `supposed_delivery_time` on the `orders` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[delivery_information_id]` on the table `orders` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[address_id]` on the table `restaurants` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `delivery_information_id` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address_id` to the `restaurants` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "delivery_types" AS ENUM ('WALKING', 'DRIVING');

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "actual_delivery_time",
DROP COLUMN "delivery_accepted_at",
DROP COLUMN "delivery_finished_at",
DROP COLUMN "supposed_delivery_time",
ADD COLUMN     "delivery_information_id" BIGINT NOT NULL;

-- AlterTable
ALTER TABLE "restaurants" ADD COLUMN     "address_id" BIGINT NOT NULL;

-- CreateTable
CREATE TABLE "addresses" (
    "id" BIGSERIAL NOT NULL,
    "country" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "customer_id" BIGINT,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "deliveries_information" (
    "id" BIGSERIAL NOT NULL,
    "delivery_type" "delivery_types" NOT NULL,
    "delivery_distance" DOUBLE PRECISION NOT NULL,
    "supposed_delivery_time" INTEGER NOT NULL,
    "origin_address" TEXT NOT NULL,
    "destination_address" TEXT NOT NULL,
    "delivery_accepted_at" TIMESTAMPTZ,
    "actual_delivery_time" INTEGER,
    "delivery_finished_at" TIMESTAMPTZ,

    CONSTRAINT "deliveries_information_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "orders_delivery_information_id_key" ON "orders"("delivery_information_id");

-- CreateIndex
CREATE UNIQUE INDEX "restaurants_address_id_key" ON "restaurants"("address_id");

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "restaurants" ADD CONSTRAINT "restaurants_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_delivery_information_id_fkey" FOREIGN KEY ("delivery_information_id") REFERENCES "deliveries_information"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
