/*
  Warnings:

  - The `role` column on the `authUser` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `status` on the `orders` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `unit` on the `serviceType` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `gender` on the `userProfile` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('RECEIVED', 'PROCESS', 'FINISH', 'COMPLETED');

-- CreateEnum
CREATE TYPE "Unit" AS ENUM ('Kg', 'Pcs');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Admin', 'Customer');

-- AlterTable
ALTER TABLE "authUser" DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'Customer';

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL;

-- AlterTable
ALTER TABLE "serviceType" DROP COLUMN "unit",
ADD COLUMN     "unit" "Unit" NOT NULL;

-- AlterTable
ALTER TABLE "userProfile" DROP COLUMN "gender",
ADD COLUMN     "gender" "Gender" NOT NULL;
