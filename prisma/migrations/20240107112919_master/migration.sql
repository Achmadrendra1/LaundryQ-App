/*
  Warnings:

  - You are about to drop the column `phone_number` on the `authUser` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[phone_number]` on the table `userProfile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `role` to the `authUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `userProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone_number` to the `userProfile` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('RECEIVED', 'PROCESS', 'FINISH', 'COMPLETED');

-- CreateEnum
CREATE TYPE "Unit" AS ENUM ('Kg', 'Pcs');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Admin', 'Customer');

-- DropIndex
DROP INDEX "authUser_phone_number_key";

-- AlterTable
ALTER TABLE "authUser" DROP COLUMN "phone_number",
ADD COLUMN     "role" "Role" NOT NULL;

-- AlterTable
ALTER TABLE "userProfile" ADD COLUMN     "gender" "Gender" NOT NULL,
ADD COLUMN     "phone_number" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "whatsappDevice" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "session_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "updated_by" TEXT,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" TEXT,

    CONSTRAINT "whatsappDevice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notification" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "receiver_id" TEXT NOT NULL,
    "is_scheduled" BOOLEAN NOT NULL,
    "scheduled_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "updated_by" TEXT,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" TEXT,

    CONSTRAINT "notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "serviceType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "unit" "Unit" NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "updated_by" TEXT,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" TEXT,

    CONSTRAINT "serviceType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "itemType" (
    "id" TEXT NOT NULL,
    "service_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "updated_by" TEXT,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" TEXT,

    CONSTRAINT "itemType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "bill_no" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "date_received" TIMESTAMP(3) NOT NULL,
    "date_pickup" TIMESTAMP(3) NOT NULL,
    "total" BIGINT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "updated_by" TEXT,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" TEXT,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "detailOrder" (
    "id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "total_price" BIGINT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "updated_by" TEXT,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" TEXT,

    CONSTRAINT "detailOrder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "whatsappDevice_user_id_key" ON "whatsappDevice"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "whatsappDevice_session_id_key" ON "whatsappDevice"("session_id");

-- CreateIndex
CREATE UNIQUE INDEX "userProfile_phone_number_key" ON "userProfile"("phone_number");

-- AddForeignKey
ALTER TABLE "whatsappDevice" ADD CONSTRAINT "whatsappDevice_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "authUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "userProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itemType" ADD CONSTRAINT "itemType_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "serviceType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detailOrder" ADD CONSTRAINT "detailOrder_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detailOrder" ADD CONSTRAINT "detailOrder_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "itemType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
