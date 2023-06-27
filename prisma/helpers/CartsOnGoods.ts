import {Cart, Good, CartsOnGoods} from "@prisma/client";
import {prisma} from "../../lib/prisma";
import {faker} from "@faker-js/faker";

/**
 * "Посев" связей между товарами и корзинами
 * @param maxGoodsAmount максимальное количество товаров в заказе
 */
export const seedCartsOnGoods = async (maxGoodsAmount: number): Promise<void> => {
    const goods: Good[] = await prisma.good.findMany()
    const carts: Cart[] = await prisma.cart.findMany()

    // Create between 1 and 3 goods per cart
    const cartsOnGoods: CartsOnGoods[] = carts.flatMap((cart: Cart) => {
        const count = faker.number.int({min: 0, max: maxGoodsAmount});
        const selectedGoods = faker.helpers.arrayElements(goods, count);

        return selectedGoods.map((good: Good) => {
            return {
                cartId: cart.id,
                goodId: good.id,
            }
        });
    });

    //Заполняем данными таблицу связей
    await prisma.cartsOnGoods.createMany({data: cartsOnGoods})
}