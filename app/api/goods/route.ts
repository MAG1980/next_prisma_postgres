import {NextRequest, NextResponse} from 'next/server'
import {prisma} from '@/lib/prisma'

export async function GET(request: NextRequest) {
    // Извлекаем строковые значения query-параметров: номер текущей страницы и количество записей на странице

    // const pagination = JSON.parse(request.nextUrl.searchParams.get('pagination'))
    // const {page, perPage} = pagination
    // console.log("page: ", page)

    const sortStr = request.nextUrl.searchParams.get('sort')

    const idsStr = request.nextUrl.searchParams.get('filter')

    const pageNumberStr = request.nextUrl.searchParams.get('page')
    const limitStr = request.nextUrl.searchParams.get('perPage')

    function getArgs() {
        let args: any = {}

        if (sortStr) {
            const [field, order]:[string,string] = JSON.parse(sortStr)
            args.orderBy = {[field]: order.toLowerCase()}
        }
        if (idsStr) {
            const idsArr = JSON.parse(idsStr).ids.map(Number)
            args.where = {
                id: {in: [...idsArr]}
            }
        }
        if (pageNumberStr) {
            // Преобразуем строковые значения в цифровые (десятичная система счисления - radix)
            const pageNumber = pageNumberStr ? parseInt(pageNumberStr, 10) : 1
            const limit = limitStr ? parseInt(limitStr, 10) : 10
            // Вычисляем смещение выборки записей БД с учётом номера текущей страницы и предела
            const skip = (pageNumber - 1) * limit
            args = {...args, skip, take: limit}
        }
        console.log("args: ", args)
        return args
    }


    try {
        const goods = await prisma.good.findMany(getArgs())
        const total = await prisma.good.aggregate({
            _count: true
        })
        let response = {
            status: 'success',
            results: goods.length,
            pagination: {
                page: pageNumberStr,
                perPage: limitStr
            },
            total: total._count,
            data: goods,
        }

        return new NextResponse(
            JSON.stringify(response),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                    'content-range': total._count.toString()
                }
            }
        )

    } catch (error: any) {
        const errorResponse = {
            status: "error",
            message: error.message,
        }
        return new NextResponse(
            JSON.stringify(errorResponse),
            {
                status: 500,
                headers: {"Content-Type": "application/json"}
            }
        )
    }
}

export async function POST(request: Request) {
    try {
        const requestData = await request.json()
        // console.log("requestData: ", requestData)
        const good = await prisma.good.create({
            data: requestData
        })

        const response = {
            status: 'success',
            data: {
                good
            }
        }

        return new NextResponse(
            JSON.stringify(response),
            {
                status: 201,
                headers: {
                    "Content-Type": "application/json"
                }
            })
    } catch (error: any) {
        // Ошибка нарушения ограничения уникальности записи в БД
        if (error.code === "P2002") {
            const errorResponse = {
                status: "fail",
                message: "Good with this title already exists",
            }
            return new NextResponse(
                JSON.stringify(errorResponse),
                {
                    status: 409,
                    headers: {"Content-Type": "application/json"}
                }
            )
        }

        // Ошибка сервера
        const errorResponse = {
            status: "error",
            message: error.message
        }
        return new NextResponse(
            JSON.stringify(errorResponse),
            {
                status: 500,
                headers: {"Content-Type": "application/json"}
            }
        )
    }
}