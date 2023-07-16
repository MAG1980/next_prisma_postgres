import {fakerRU as faker} from "@faker-js/faker";

export const getMathRandomInt = (max: number): number => {
    return Math.floor(Math.random() * max)
}
export const getObject = <T>(params: T): T => {
    return {...params}
}

export const getArray = <T>(maxQuantity: number, params: T): T[] => {
    let result: T[] = []
    const object = getObject(params)
    for (let i = 1; i < maxQuantity; i++) {
        result = [...result, object]
    }
    return result
}

/**
 * Возвращает массив случайных элементов
 * @param array исходный массив
 * @param maxAmount максимальная длина результирующего массива
 */
export const getRandomElements = <T>(array: T[], maxAmount: number): T[] => {
    if (maxAmount > array.length) {
        console.log('Задано недопустимое максимальное количество элементов результирующего массива')
        return []
    }
    let result: T[] = []
    for (let i = 0; i < maxAmount; i++) {
        result = [...result, array[faker.number.int({min: 0, max: array.length - 1})]]
    }
    return result
}