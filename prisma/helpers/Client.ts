import {fakerRU as faker} from '@faker-js/faker';
import {UniqueEnforcer} from 'enforce-unique';
import {prisma} from "../../lib/prisma";
import {getOrders} from "../helpers/Order";

const uniqueEnforcerLogin = new UniqueEnforcer();
const uniqueEnforcerEmail = new UniqueEnforcer();
const uniqueEnforcerPhone = new UniqueEnforcer();

export const getLogin = (): string => uniqueEnforcerLogin.enforce(() => {
    return faker.internet.userName()
})

export const getEmail = (firstName: string, lastName: string): string => uniqueEnforcerEmail.enforce(() => {
    return faker.internet.email({firstName, lastName});
});

export const getPhoneNumber = (): string => uniqueEnforcerPhone.enforce(() => {
    return faker.phone.number()
})

export const getClient = () => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    return {
        firstName,
        lastName,
        login: getLogin(),
        email: getEmail(firstName, lastName),
        phoneNumber: getPhoneNumber()
    }
}

/**
 * "Посев" клиентов с заказами
 * @param clientsAmount количество клиентов
 * @param maxOrdersAmount максимальное количество заказов у каждого клиента
 */
export const seedsClientsWithOrders = async (clientsAmount: number, maxOrdersAmount: number): Promise<void> => {
    for (let i = 0; i < clientsAmount; i++) {
        await prisma.client.create(
            {
                data: {
                    ...getClient(),
                    orders: {
                        create: [
                            ...getOrders(maxOrdersAmount)
                        ]
                    },
                }
            }
        )
    }
}


