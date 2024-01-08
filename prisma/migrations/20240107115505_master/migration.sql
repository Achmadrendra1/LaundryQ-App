-- AlterTable
ALTER TABLE "authUser" ALTER COLUMN "role" SET DEFAULT 'Customer';

-- AlterTable
ALTER TABLE "userProfile" ALTER COLUMN "gender" DROP NOT NULL;
