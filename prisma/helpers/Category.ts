import {prisma} from "../../lib/prisma";

const Categories = [
    {name: "Завтраки"},
    {name: "Бургеры"},
    {name: "Напитки"},
    {name: "Снеки"},
]

export const seedsCategories = async () => {
    await prisma.category.createMany({
        data: [...Categories]
    })
}


