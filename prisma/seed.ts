import {PrismaClient} from "@prisma/client";
import {faker} from '@faker-js/faker';
import {EnforceUniqueError, UniqueEnforcer} from 'enforce-unique';

const prisma = new PrismaClient()

const uniqueEnforcerLogin = new UniqueEnforcer();
const uniqueEnforcerEmail = new UniqueEnforcer();
const uniqueEnforcerPhone = new UniqueEnforcer();

const getLogin = (): string => uniqueEnforcerLogin.enforce(() => {
    return faker.internet.userName()
})

const getEmail = (firstName: string, lastName: string): string => uniqueEnforcerEmail.enforce(() => {
    return faker.internet.email({firstName, lastName});
});

const getPhoneNumber = (): string => uniqueEnforcerPhone.enforce(() => {
    return faker.phone.number()
})

const getClient = () => {
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


async function main() {
    //Если использовать create вместо upsert, то при каждом посеве client создавался бы заново
    const client = await prisma.client.upsert({
        //проверка client на существование
        where: {email: 'test@test.com'},
        update: {},
        //выполнится только в том случае, если client не существует
        create: {
            login: 'Login',
            email: 'test@test.com',
            firstName: 'Test User',
            lastName: 'Test User Lastname',
            phoneNumber: "+75554443322",
        }
    })
    console.log(client)

    //Используем Faker
    for (let i = 0; i < 10; i++) {

        await prisma.client.create(
            {
                data: {...getClient()}
            }
        )
    }
}

main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.log(e)
        await prisma.$disconnect()
        process.exit(1)
    })