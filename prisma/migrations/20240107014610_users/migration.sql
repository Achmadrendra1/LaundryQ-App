-- CreateTable
CREATE TABLE "authUser" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "is_verify_phone" BOOLEAN,
    "verify_phone_code" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "updated_by" TEXT,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" TEXT,

    CONSTRAINT "authUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userProfile" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "updated_by" TEXT,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" TEXT,

    CONSTRAINT "userProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "authUser_username_key" ON "authUser"("username");

-- CreateIndex
CREATE UNIQUE INDEX "authUser_email_key" ON "authUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "authUser_phone_number_key" ON "authUser"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "userProfile_user_id_key" ON "userProfile"("user_id");

-- AddForeignKey
ALTER TABLE "userProfile" ADD CONSTRAINT "userProfile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "authUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
