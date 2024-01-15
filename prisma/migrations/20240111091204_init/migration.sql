-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('RECEIVED', 'PROCESS', 'FINISH', 'COMPLETED');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PAID', 'UNPAID', 'CANCELED');

-- CreateEnum
CREATE TYPE "Unit" AS ENUM ('Kg', 'Pcs');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Admin', 'Customer');

-- CreateTable
CREATE TABLE "authUser" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'Customer',
    "is_verify_phone" BOOLEAN,
    "verify_phone_code" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT DEFAULT 'System',
    "updated_at" TIMESTAMP(3),
    "updated_by" TEXT,

    CONSTRAINT "authUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userProfile" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT DEFAULT 'System',
    "updated_at" TIMESTAMP(3),
    "updated_by" TEXT,

    CONSTRAINT "userProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "whatsappDevice" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "session_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT DEFAULT 'System',
    "updated_at" TIMESTAMP(3),
    "updated_by" TEXT,

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
    "created_by" TEXT DEFAULT 'System',
    "updated_at" TIMESTAMP(3),
    "updated_by" TEXT,

    CONSTRAINT "notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "serviceType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "unit" "Unit" NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT DEFAULT 'System',
    "updated_at" TIMESTAMP(3),
    "updated_by" TEXT,

    CONSTRAINT "serviceType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "itemType" (
    "id" TEXT NOT NULL,
    "service_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT DEFAULT 'System',
    "updated_at" TIMESTAMP(3),
    "updated_by" TEXT,

    CONSTRAINT "itemType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "paymentService" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "account_number" TEXT NOT NULL,
    "payment_type_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT DEFAULT 'System',
    "updated_at" TIMESTAMP(3),
    "updated_by" TEXT,

    CONSTRAINT "paymentService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "paymentType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT DEFAULT 'System',
    "updated_at" TIMESTAMP(3),
    "updated_by" TEXT,

    CONSTRAINT "paymentType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "bill_no" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "cashier_id" TEXT NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'RECEIVED',
    "date_received" TIMESTAMP(3) NOT NULL,
    "date_pickup" TIMESTAMP(3) NOT NULL,
    "is_paid" BOOLEAN NOT NULL DEFAULT false,
    "payment_id" TEXT,
    "total" BIGINT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT DEFAULT 'System',
    "updated_at" TIMESTAMP(3),
    "updated_by" TEXT,

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
    "created_by" TEXT DEFAULT 'System',
    "updated_at" TIMESTAMP(3),
    "updated_by" TEXT,

    CONSTRAINT "detailOrder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "authUser_username_key" ON "authUser"("username");

-- CreateIndex
CREATE UNIQUE INDEX "authUser_email_key" ON "authUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "userProfile_user_id_key" ON "userProfile"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "userProfile_phone_number_key" ON "userProfile"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "whatsappDevice_user_id_key" ON "whatsappDevice"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "whatsappDevice_session_id_key" ON "whatsappDevice"("session_id");

-- CreateIndex
CREATE UNIQUE INDEX "serviceType_name_key" ON "serviceType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "itemType_name_key" ON "itemType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "paymentService_account_number_key" ON "paymentService"("account_number");

-- CreateIndex
CREATE UNIQUE INDEX "paymentType_name_key" ON "paymentType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "orders_bill_no_key" ON "orders"("bill_no");

-- AddForeignKey
ALTER TABLE "userProfile" ADD CONSTRAINT "userProfile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "authUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "whatsappDevice" ADD CONSTRAINT "whatsappDevice_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "authUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "userProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itemType" ADD CONSTRAINT "itemType_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "serviceType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paymentService" ADD CONSTRAINT "paymentService_payment_type_id_fkey" FOREIGN KEY ("payment_type_id") REFERENCES "paymentType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "paymentService"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detailOrder" ADD CONSTRAINT "detailOrder_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detailOrder" ADD CONSTRAINT "detailOrder_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "itemType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
