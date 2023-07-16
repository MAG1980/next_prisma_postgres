import {fakerRU as faker} from '@faker-js/faker';
import {UniqueEnforcer} from 'enforce-unique';
import {prisma} from "../../lib/prisma";
import {getImages} from "./GoodsImage";
import {Category, Good, Prisma} from "@prisma/client";
import {getRandomElements} from "../helpers/general_use";

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
 * @param maxCategoriesAmount максимальное количество категорий товара
 */
export const seedsGoodsWithImages = async (
    goodsAmount: number,
    maxImagesAmount: number,
    maxCategoriesAmount: number): Promise<void> => {
    const categories: Category[] = await prisma.category.findMany()
    for (let i = 0; i < goodsAmount; i++) {
        await prisma.good.create(
            {
                data: {
                    ...getGood(),
                    goodsImages: {
                        create: [
                            ...getImages(maxImagesAmount)
                        ]
                    },
                    active: faker.datatype.boolean(),
                    categories: {
                        connect: [...getRandomElements(categories, maxCategoriesAmount)
                            .map(element => (
                                {id: element.id}
                            ))
                        ]
                    }
                }
            }
        )
    }
}