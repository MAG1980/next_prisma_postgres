const {prisma} = require("../lib/prisma")

import {seedsClientsWithOrders} from "./helpers/Client"
import {seedsGoodsWithImages} from "./helpers/Good"
import {seedGoodsOnOrders} from "./helpers/GoodsOnOrders"
import {seedCartsOnGoods} from "./helpers/CartsOnGoods"

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
    await seedsClientsWithOrders(50, 3)

    //Создаём товары с изображениями
    await seedsGoodsWithImages(100, 3)

    //Создаём связи между товарами и заказами
    await seedGoodsOnOrders(5)

    //Создаём связи между товарами и корзинами
    await seedCartsOnGoods(3)
}

main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.log(e)
        await prisma.$disconnect()
        process.exit(1)
    })