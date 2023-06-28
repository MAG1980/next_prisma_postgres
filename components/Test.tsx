import { Prisma } from '@prisma/client'
import { prisma } from "@/lib/prisma";
import { Client, Good, GoodsOnOrders, Order } from "@prisma/client";

const clientsOrdersGoods = Prisma.validator<Prisma.ClientInclude>()({
    orders: true,
})

const orderGoods = Prisma.validator<Prisma.OrderInclude>()({
    goods: true
})

const Test = async () => {

    const clients = await prisma.client.findMany()
    console.log(clients)

    const clientsWithOrders = await prisma.client.findMany({
        include: {
            orders: {
                include: {
                    goods:true
                }
            }
        }
    })



    return (
        <div>
            <div>
                {clientsWithOrders.map((client,) => (
                    <ul key={client.id}>
                        <li>{client.login}</li>
                        <li>{client.firstName}</li>
                        <li>{client.lastName}</li>
                        <li>{client.email}</li>
                        <li>{client.phoneNumber}</li>
                        <li>{client.orders.map(order => (
                            <div>
                                <ul>
                                    <li>{order.id}</li>
                                    <li>{order.status}</li>
                                    <li>
                                        <div>
                                            <ul>
                                                {order.goods.map(good=>(
                                                    <li>{good.goodId}</li>
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