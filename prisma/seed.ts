import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()

async function main() {
    //Если использовать create вместо upsert, то при каждом посеве client создавался бы заново
    const client = await prisma.client.upsert({
        //проверка client на существование
        where: {name: 'test@test.com'},
        update: {},
        //выполнится только в том случае, если client не существует
        create: {
            email: 'test@test.com',
            name: 'Test User',
            phone_number: "+75554443322"
        }
    })
    console.log(client)
}
main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.log(e)
        await prisma.$disconnect()
        process.exit(1)
    })