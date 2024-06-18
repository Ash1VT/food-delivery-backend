-- AlterTable
ALTER TABLE "deliveries_information" ALTER COLUMN "delivery_type" DROP NOT NULL,
ALTER COLUMN "delivery_distance" DROP NOT NULL,
ALTER COLUMN "supposed_delivery_time" DROP NOT NULL;
