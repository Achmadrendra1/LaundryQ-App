/*
  Warnings:

  - The `role` column on the `authUser` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `status` on the `orders` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `unit` on the `serviceType` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `gender` on the `userProfile` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "authUser" DROP COLUMN "role",
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'Customer';

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "serviceType" DROP COLUMN "unit",
ADD COLUMN     "unit" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "userProfile" DROP COLUMN "gender",
ADD COLUMN     "gender" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Gender";

-- DropEnum
DROP TYPE "Role";

-- DropEnum
DROP TYPE "Status";

-- DropEnum
DROP TYPE "Unit";
