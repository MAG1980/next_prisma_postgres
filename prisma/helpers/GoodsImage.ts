import {faker} from '@faker-js/faker';
import {UniqueEnforcer} from 'enforce-unique';
import {GoodsImage} from "@prisma/client";

const uniqueEnforcerLink = new UniqueEnforcer();

export const getLink = (): string => uniqueEnforcerLink.enforce(() => {
    return faker.image.urlLoremFlickr({
        category: "food",
        width: 640,
        height: 480,
    })
})
/*export const getImage = (): GoodsImage => {
    return {
    link: getLink(),
    fileSize: faker.number.int({min: 1500000, max:3500000})
    } as GoodsImage
}*/

export const getImages = (amount:number):GoodsImage[] => {
    return Array.from({length: amount}, () => (
        {
            link: getLink(),
            fileSize: faker.number.int({min: 1500000, max: 3500000})
        } as GoodsImage)
    )
}
