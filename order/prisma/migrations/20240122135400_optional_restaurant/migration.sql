-- DropForeignKey
ALTER TABLE "restaurant_managers" DROP CONSTRAINT "restaurant_managers_restaurant_id_fkey";

-- AlterTable
ALTER TABLE "restaurant_managers" ALTER COLUMN "restaurant_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "restaurant_managers" ADD CONSTRAINT "restaurant_managers_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE SET NULL ON UPDATE CASCADE;
