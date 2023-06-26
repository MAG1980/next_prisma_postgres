import {faker} from "@faker-js/faker";
import {Good, Order, GoodsOnOrders} from "@prisma/client";

const {prisma} = require("../lib/prisma")

const {getOrders} = require("./helpers/Order")
const {getClient} = require("./helpers/Client")
const {getGood} = require("./helpers/Good")
const {getImages} = require("./helpers/GoodsImage")


async function main() {
    //Если использовать create вместо upsert, то при каждом посеве client создавался бы заново
    const client = await prisma.client.upsert({
        //проверка client на существование
        where: {email: 'test@test.com'},
        update: {},
        //выполнится только в том случае, если client не существует
        create: {
            login: 'Login',
            email: 'test@test.com',
            firstName: 'Test User',
            lastName: 'Test User Lastname',
            phoneNumber: "+75554443322",
        }
    })
    console.log(client)

    //Создаём клиентов с заказами
    for (let i = 0; i < 10; i++) {
        await prisma.client.create(
            {
                data: {
                    ...getClient(),
                    orders: {
                        create: [
                            ...getOrders(3)
                        ]
                    }
                }

            }
        )
    }

    //Создаём товары с изображениями
    for (let i = 0; i < 5; i++) {
        await prisma.good.create(
            {
                data: {
                    ...getGood(),
                    goodsImages: {
                        create: [
                            ...getImages(faker.number.int({min: 1, max: 3}))
                        ]
                    }
                }

            }
        )
    }

    const goods: Good[] = await prisma.good.findMany()
    const orders: Order[] = await prisma.order.findMany()

    // Create between 1 and 3 goods per order
    const goodsOnOrders: GoodsOnOrders[] = orders.flatMap((order: Order) => {
        const count = faker.number.int({min: 1, max: 3});
        const selectedGoods = faker.helpers.arrayElements(goods, count);

        return selectedGoods.map((good: Good) => {
            return {
                orderId: order.id,
                goodId: good.id,
            }
        });
    });

    //Заполняем данными таблицу связей
    await prisma.goodsOnOrders.createMany({data: goodsOnOrders})

}

main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.log(e)
        await prisma.$disconnect()
        process.exit(1)
    })