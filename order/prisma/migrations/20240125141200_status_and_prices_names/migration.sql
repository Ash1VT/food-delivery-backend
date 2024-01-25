/*
  Warnings:

  - You are about to drop the column `decountedPrice` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `totalPrice` on the `orders` table. All the data in the column will be lost.
  - Added the required column `decounted_price` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_price` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "order_statuses" ADD VALUE 'READY';

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "decountedPrice",
DROP COLUMN "totalPrice",
ADD COLUMN     "decounted_price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "total_price" DOUBLE PRECISION NOT NULL;
