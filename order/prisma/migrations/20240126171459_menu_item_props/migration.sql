/*
  Warnings:

  - Added the required column `image_url` to the `menu_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `menu_items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "menu_items" ADD COLUMN     "image_url" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;
