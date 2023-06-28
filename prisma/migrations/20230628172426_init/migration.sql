-- CreateEnum
CREATE TYPE "OrderStatuses" AS ENUM ('ISSUED', 'PAID', 'DELIVERY', 'READY', 'COMPLETED');

-- CreateTable
CREATE TABLE "Client" (
    "id" SERIAL NOT NULL,
    "login" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "phoneNumber" TEXT,
    "email" TEXT,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cart" (
    "id" SERIAL NOT NULL,
    "clientId" INTEGER NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Good" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "basePrice" DOUBLE PRECISION NOT NULL,
    "ingredients" JSONB,
    "description" TEXT NOT NULL,

    CONSTRAINT "Good_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CartsOnGoods" (
    "cartId" INTEGER NOT NULL,
    "goodId" INTEGER NOT NULL,

    CONSTRAINT "CartsOnGoods_pkey" PRIMARY KEY ("cartId","goodId")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "clientId" INTEGER NOT NULL,
    "status" "OrderStatuses" NOT NULL DEFAULT 'ISSUED',

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GoodsOnOrders" (
    "goodId" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,

    CONSTRAINT "GoodsOnOrders_pkey" PRIMARY KEY ("goodId","orderId")
);

-- CreateTable
CREATE TABLE "GoodsImage" (
    "id" SERIAL NOT NULL,
    "goodId" INTEGER NOT NULL,
    "link" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GoodsImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_login_key" ON "Client"("login");

-- CreateIndex
CREATE UNIQUE INDEX "Client_phoneNumber_key" ON "Client"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Cart_clientId_key" ON "Cart"("clientId");

-- CreateIndex
CREATE UNIQUE INDEX "Good_name_key" ON "Good"("name");

-- CreateIndex
CREATE UNIQUE INDEX "GoodsImage_link_key" ON "GoodsImage"("link");

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartsOnGoods" ADD CONSTRAINT "CartsOnGoods_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartsOnGoods" ADD CONSTRAINT "CartsOnGoods_goodId_fkey" FOREIGN KEY ("goodId") REFERENCES "Good"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsOnOrders" ADD CONSTRAINT "GoodsOnOrders_goodId_fkey" FOREIGN KEY ("goodId") REFERENCES "Good"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsOnOrders" ADD CONSTRAINT "GoodsOnOrders_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsImage" ADD CONSTRAINT "GoodsImage_goodId_fkey" FOREIGN KEY ("goodId") REFERENCES "Good"("id") ON DELETE CASCADE ON UPDATE CASCADE;
