/*
  Warnings:

  - Added the required column `restaurant_id` to the `menu_items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "menu_items" ADD COLUMN     "restaurant_id" BIGINT NOT NULL;

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "status" SET DEFAULT 'PENDING';

-- AddForeignKey
ALTER TABLE "menu_items" ADD CONSTRAINT "menu_items_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
