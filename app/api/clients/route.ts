import {NextRequest, NextResponse} from 'next/server'
import {prisma} from '@/lib/prisma'

export async function GET(request: NextRequest) {
    // Извлекаем строковые значения query-параметров: номер текущей страницы и количество записей на странице

    // const pagination = JSON.parse(request.nextUrl.searchParams.get('pagination'))
    // const {page, perPage} = pagination
    // console.log("page: ", page)


    const pageNumberStr = request.nextUrl.searchParams.get('page') as string
    const limitStr = request.nextUrl.searchParams.get('perPage') as string

    // Преобразуем строковые значения в цифровые (десятичная система счисления - radix)
    const pageNumber = pageNumberStr ? parseInt(pageNumberStr, 10) : 1
    const limit = limitStr ? parseInt(limitStr, 10) : 10
    // Вычисляем смещение выборки записей БД с учётом номера текущей страницы и предела
    const skip = (pageNumber - 1) * limit

    const clients = await prisma.client.findMany({
        skip,
        take: limit
    })

    const total = await prisma.client.aggregate({
        _count: true
    })

    let response = {
        status: 'success',
        results: clients.length,
        pagination: {
            page: pageNumber,
            perPage: limit
        },
        total: total._count,
        data: clients,
    }

    // return NextResponse.json(response)
    return new NextResponse(
        JSON.stringify(response),
        {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                'content-range': total._count.toString()
            }
        })
}

export async function POST(request: Request) {
   try {
        const requestData = await request.json()
        // console.log("requestData: ", requestData)
        const client = await prisma.client.create({
            data: requestData
        })

        const response = {
            status: 'success',
            data: {
                client
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