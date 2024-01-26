/*
  Warnings:

  - You are about to drop the column `menu_item_id` on the `order_items` table. All the data in the column will be lost.
  - Added the required column `menu_item_image_url` to the `order_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `menu_item_name` to the `order_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `menu_item_price` to the `order_items` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "order_items" DROP CONSTRAINT "order_items_menu_item_id_fkey";

-- AlterTable
ALTER TABLE "order_items" DROP COLUMN "menu_item_id",
ADD COLUMN     "menu_item_image_url" TEXT NOT NULL,
ADD COLUMN     "menu_item_name" TEXT NOT NULL,
ADD COLUMN     "menu_item_price" DOUBLE PRECISION NOT NULL;
