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
