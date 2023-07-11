import {NextRequest, NextResponse} from 'next/server'
import {prisma} from '@/lib/prisma'

export async function GET(request: NextRequest) {
    // Извлекаем строковые значения query-параметров: номер текущей страницы и количество записей на странице
    const pageNumberStr = request.nextUrl.searchParams.get('page')
    const limitStr = request.nextUrl.searchParams.get('limit')

    // Преобразуем строковые значения в цифровые (десятичная система счисления - radix)
    const pageNumber = pageNumberStr ? parseInt(pageNumberStr, 10) : 1
    const limit = limitStr ? parseInt(limitStr, 10) : 10
    // Вычисляем смещение выборки записей БД с учётом номера текущей страницы и предела
    const skip = (pageNumber - 1) * limit

    const goods = await prisma.good.findMany({
        skip,
        take: limit
    })

    let response = {
        status: 'success',
        results: goods.length,
        goods
    }

    return NextResponse.json(response)
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