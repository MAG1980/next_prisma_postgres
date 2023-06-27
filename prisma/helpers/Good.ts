import {fakerRU as faker} from '@faker-js/faker';
import {UniqueEnforcer} from 'enforce-unique';
import {prisma} from "../../lib/prisma";
import {getImages} from "./GoodsImage";
import {Good, Prisma} from "@prisma/client";

const uniqueEnforcerName = new UniqueEnforcer();

export const getName = (): string => uniqueEnforcerName.enforce(() => {
    console.log(faker.commerce.productName())
    return faker.commerce.productName();
});
export const getGood = () => {
    return {
        name: getName(),
        basePrice: Number(faker.commerce.price({min: 10, max: 200})),
        ingredients: JSON.stringify({}),
        description: faker.commerce.productDescription()
        // carts       CartsOnGoods[]
        // goods       GoodsOnOrders[]
        // GoodsImage  GoodsImage[]
    }
}

const GoodWithImages: Prisma.GoodSelect = {
    goodsImages: true
}

/**
 * "Посев" товаров с изображениями
 * @param goodsAmount количество товаров
 * @param maxImagesAmount максимальное количество изображений у товара
 */
export const seedsGoodsWithImages = async (goodsAmount: number, maxImagesAmount: number): Promise<void> => {
    for (let i = 0; i < goodsAmount; i++) {
        await prisma.good.create(
            {
                data: {
                    ...getGood(),
                    goodsImages: {
                        create: [
                            ...getImages(maxImagesAmount)
                        ]
                    }
                }
            }
        )
    }
}