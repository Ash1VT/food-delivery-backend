/*
  Warnings:

  - You are about to alter the column `price` on the `menu_items` table. The data in that column could be lost. The data in that column will be cast from `Decimal(8,2)` to `DoublePrecision`.
  - You are about to drop the column `decounted_price` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `total_price` on the `orders` table. All the data in the column will be lost.
  - Added the required column `decountedPrice` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPrice` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "menu_items" ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "decounted_price",
DROP COLUMN "total_price",
ADD COLUMN     "decountedPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "totalPrice" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "promocodes" ALTER COLUMN "is_active" SET DEFAULT true;
