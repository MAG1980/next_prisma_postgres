const faker = require('@faker-js/faker')

import {OrderStatuses} from "@prisma/client";
const {getMathRandomInt} = require( "./general_use")
export const getRandomOrderStatus = () => {
    let variantNumber=getMathRandomInt(4)
    switch (variantNumber){
        case 1: return OrderStatuses.ISSUED
        case 2: return OrderStatuses.PAID
        case 3: return OrderStatuses.DELIVERY
        case 4: return OrderStatuses.READY
        case 5: return OrderStatuses.COMPLETED
        default:break
    }
}