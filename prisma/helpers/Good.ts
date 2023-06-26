// const faker = require('@faker-js/faker')
import {faker} from '@faker-js/faker';
import {UniqueEnforcer} from 'enforce-unique';
import {Good} from "@prisma/client";

const uniqueEnforcerName = new UniqueEnforcer();

export const getName = (): string => uniqueEnforcerName.enforce(() => {
    console.log(faker.commerce.productName())
    return faker.commerce.productName();
});
export const getGood = (): Good => {
    return {
        name: getName(),
        basePrise: Number(faker.commerce.price({min: 10, max: 200})),
        // ingredients Json
        description: faker.commerce.productDescription()
        // carts       CartsOnGoods[]
        // goods       GoodsOnOrders[]
        // GoodsImage  GoodsImage[]
    } as Good
}