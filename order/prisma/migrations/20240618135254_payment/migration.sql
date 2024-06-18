/*
  Warnings:

  - A unique constraint covering the columns `[payment_information_id]` on the table `orders` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `payment_information_id` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "payment_information_id" BIGINT NOT NULL;

-- CreateTable
CREATE TABLE "PaymentInformation" (
    "id" BIGSERIAL NOT NULL,
    "payment_intent_id" TEXT NOT NULL,
    "client_secret_key" TEXT NOT NULL,
    "is_paid" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PaymentInformation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "orders_payment_information_id_key" ON "orders"("payment_information_id");

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_payment_information_id_fkey" FOREIGN KEY ("payment_information_id") REFERENCES "PaymentInformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
