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
CREATE TABLE "Good" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "basePrice" DOUBLE PRECISION NOT NULL,
    "ingredients" JSONB,
    "description" TEXT NOT NULL,

    CONSTRAINT "Good_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "clientId" INTEGER NOT NULL,
    "status" "OrderStatuses" NOT NULL DEFAULT 'ISSUED',

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
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

-- CreateTable
CREATE TABLE "_GoodToOrder" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CategoryToGood" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_login_key" ON "Client"("login");

-- CreateIndex
CREATE UNIQUE INDEX "Client_phoneNumber_key" ON "Client"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Good_name_key" ON "Good"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "GoodsImage_link_key" ON "GoodsImage"("link");

-- CreateIndex
CREATE UNIQUE INDEX "_GoodToOrder_AB_unique" ON "_GoodToOrder"("A", "B");

-- CreateIndex
CREATE INDEX "_GoodToOrder_B_index" ON "_GoodToOrder"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToGood_AB_unique" ON "_CategoryToGood"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToGood_B_index" ON "_CategoryToGood"("B");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsImage" ADD CONSTRAINT "GoodsImage_goodId_fkey" FOREIGN KEY ("goodId") REFERENCES "Good"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GoodToOrder" ADD CONSTRAINT "_GoodToOrder_A_fkey" FOREIGN KEY ("A") REFERENCES "Good"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GoodToOrder" ADD CONSTRAINT "_GoodToOrder_B_fkey" FOREIGN KEY ("B") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToGood" ADD CONSTRAINT "_CategoryToGood_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToGood" ADD CONSTRAINT "_CategoryToGood_B_fkey" FOREIGN KEY ("B") REFERENCES "Good"("id") ON DELETE CASCADE ON UPDATE CASCADE;
