import {faker} from '@faker-js/faker';
import {EnforceUniqueError, UniqueEnforcer} from 'enforce-unique';
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


