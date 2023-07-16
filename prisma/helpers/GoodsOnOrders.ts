import {Good, Order, Prisma} from "@prisma/client";
import {prisma} from "../../lib/prisma";
import {fakerRU as faker} from "@faker-js/faker";

const orderGood = Prisma.validator<Prisma.OrderInclude>()({
    goods: true,
})
/**
 * "Посев" связей между товарами и заказами
 * @param maxGoodsAmount максимальное количество товаров в заказе
 */
export const seedGoodsOnOrders = async (maxGoodsAmount: number): Promise<void> => {
    const goods: Good[] = await prisma.good.findMany()
    const orders: Order[] = await prisma.order.findMany()

    /**
     * Возвращает случайный массив товаров, длина которого ограничена параметром maxGoodsAmount
     * @param maxGoodsAmount максимальное количество товаров в заказе
     */
    const getRandomGoods = (maxGoodsAmount: number) => {
        //Получаем случайное количество товаров из заданного диапазона
        const count = faker.number.int({min: 1, max: maxGoodsAmount});
        let randomGoodsIds :{ id: number }[] = []
        for (let i = 0; i < maxGoodsAmount; i++) {
            const randomGood: Good[] = faker.helpers.arrayElements(goods, 1);
            const randomGoodId = randomGood.map(good => ({
                id: good.id
            }))
            randomGoodsIds = [...randomGoodsIds, ...randomGoodId]
        }
        return randomGoodsIds
    }

    orders.map(async (order) => {
        await prisma.order.update({
            where: {id: order.id},
            data: {
                goods: {
                    connect: [
                        ...getRandomGoods(maxGoodsAmount)
                    ]
                }
            }
        })
    })
}