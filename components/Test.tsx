import {Prisma, Good} from '@prisma/client'
import {prisma} from "@/lib/prisma";
import {keys} from "@mui/system";

const clientsOrdersGoods = Prisma.validator<Prisma.ClientInclude>()({
    orders: true,
})

const getGood =async (goodId:number):Promise<Good>=>{
    return prisma.good.findUnique({
        where: {
            id: goodId
        }
    });
}

const renderGood = async (goodId:number)=>{
    const good = await getGood(goodId)
    console.log(good)
return Object.keys(good).map((key:string) =>{
    return  <li>{key}: {good[key]}</li>
})

}


const Test = async () => {

    const clients = await prisma.client.findMany()
    console.log(clients)

    const clientsWithOrders = await prisma.client.findMany({
        include: {
            orders: {
                include: {
                    goods: true
                }
            }
        }
    })

    return (
        <div>
            <div>
                {clientsWithOrders.map((client,) => (
                    <ul key={client.id}>
                        <li><h2>Клиент ID: {client.id}</h2></li>
                        <li>{client.login}</li>
                        <li>{client.firstName} {client.lastName} {client.email} {client.phoneNumber}</li>
                        <li><h3>Заказы:</h3></li>
                        <li>{client.orders.map(order => (
                            <div>
                                <ul>
                                    <li><h4>Номер заказа: {order.id}</h4></li>
                                    <li>Статус заказа: {order.status}</li>
                                    <li><h5>Состав заказа:</h5></li>
                                    <li>
                                        <div>
                                            <ul>
                                                {order.goods.map(async good => (
                                                    <>
                                                        <li><h6>Товар</h6></li>
                                                        {await renderGood(good.goodId)}
                                                        {/*<li>Название{good.name}</li>*/}
                                                    </>
                                                ))}
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        ))}
                        </li>
                    </ul>
                ))}
            </div>
            <div>

            </div>
        </div>
    )
}
export default Test