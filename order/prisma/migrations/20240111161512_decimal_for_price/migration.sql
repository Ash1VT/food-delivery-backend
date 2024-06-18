/*
  Warnings:

  - You are about to alter the column `price` on the `menu_items` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(8,2)`.
  - You are about to alter the column `total_price` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(8,2)`.
  - You are about to alter the column `decounted_price` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(8,2)`.

*/
-- AlterTable
ALTER TABLE "menu_items" ALTER COLUMN "price" SET DATA TYPE DECIMAL(8,2);

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "total_price" SET DATA TYPE DECIMAL(8,2),
ALTER COLUMN "decounted_price" SET DATA TYPE DECIMAL(8,2);
