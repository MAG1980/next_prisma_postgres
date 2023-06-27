import {fakerRU as faker} from '@faker-js/faker';
import {OrderStatuses} from "@prisma/client";

const {getMathRandomInt} = require("./general_use")

export const getRandomOrderStatus = (): OrderStatuses | undefined => {
    let variantNumber: number = getMathRandomInt(5)

    switch (variantNumber) {
        case 1:
            return OrderStatuses.ISSUED
        case 2:
            return OrderStatuses.PAID
        case 3:
            return OrderStatuses.DELIVERY
        case 4:
            return OrderStatuses.READY
        case 5:
            return OrderStatuses.COMPLETED
    }
}

export const getOrder = (): { status: OrderStatuses | undefined } => {
    return {status: getRandomOrderStatus()}
}

export const getOrders = (maxOrdersAmount: number) => {
    let result: { status: OrderStatuses | undefined }[] = []
    const ordersAmount = faker.number.int({min: 0, max: maxOrdersAmount})
    for (let i = 0; i < ordersAmount; i++) {
        let order = {
            ...getOrder(),
        }
        result = [...result, order]
    }
    return result
}