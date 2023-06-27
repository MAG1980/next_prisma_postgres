import {Good, GoodsOnOrders, Order} from "@prisma/client";
import {prisma} from "../../lib/prisma";
import {fakerRU as faker} from "@faker-js/faker";

/**
 * "Посев" связей между товарами и заказами
 * @param maxGoodsAmount максимальное количество товаров в заказе
 */
export const seedGoodsOnOrders = async (maxGoodsAmount: number): Promise<void> => {
    const goods: Good[] = await prisma.good.findMany()
    const orders: Order[] = await prisma.order.findMany()

    // Create between 1 and 3 goods per order
    const goodsOnOrders: GoodsOnOrders[] = orders.flatMap((order: Order) => {
        const count = faker.number.int({min: 1, max: maxGoodsAmount});
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