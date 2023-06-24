const {prisma} = require("../lib/prisma")

const {getArray} = require("./helpers/general_use")
const {getClient} = require("./helpers/Client")
const {getRandomOrderStatus} = require("./helpers/Order")


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
                data: {
                    ...getClient(),
                    orders: {
                        create: [
                            ...getArray(3, {status:getRandomOrderStatus()})
                        ]
                    }
                }

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