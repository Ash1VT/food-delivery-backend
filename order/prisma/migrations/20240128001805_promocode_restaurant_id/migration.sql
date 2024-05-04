/*
  Warnings:

  - Added the required column `restaurant_id` to the `promocodes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "promocodes" ADD COLUMN     "restaurant_id" BIGINT NOT NULL;

-- AddForeignKey
ALTER TABLE "promocodes" ADD CONSTRAINT "promocodes_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
