/*
  Warnings:

  - Made the column `origin_address` on table `deliveries_information` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "deliveries_information" ALTER COLUMN "origin_address" SET NOT NULL,
ALTER COLUMN "destination_address" DROP NOT NULL;
