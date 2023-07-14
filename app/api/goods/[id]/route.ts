import {NextResponse} from 'next/server'
import {prisma} from '@/lib/prisma'
import {Request} from "next/dist/compiled/@edge-runtime/primitives";

export async function GET(
    request: Request,
    {params}: { params: { id: string } }) {

    // const id =params.id
    const {id} = params
    // console.log(id)

    const good = await prisma.good.findUnique({
        where: {
            id: parseInt(id, 10)
        },
/*        include: {
            goodsImages: true
        }*/
    })

    if (!good) {
        const errorResponse = {
            status: "fail",
            message: "No Good with the Provided ID Found"
        }

        return new NextResponse(
            JSON.stringify(errorResponse),
            {
                status: 404,
                headers: {"Content-Type": "application/json"}
            })
    }

    const response = {
        status: "success",
        data: {
            ...good
        }
    }

    return NextResponse.json({...response})
}

export async function PUT(request: Request, {params}: { params: { id: string } }) {
    try {
        const id = params.id
        const requestData = await request.json()

        const updatedGood = await prisma.good.update({
            where: {
                id: parseInt(id, 10)
            },
            data: requestData
        })
        const response = {
            status: "success",
            data: {
                ...updatedGood
            }
        }
        return NextResponse.json(response)

    } catch (error: any) {
        // Ошибка БД: запись не найдена
        if (error.code === "P2025") {
            const errorResponse = {
                status: "fail",
                message: "No Good with the Provided ID Found",
            }

            return new NextResponse(
                JSON.stringify(errorResponse), {
                    status: 404,
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
        }

        //Внутренняя ошибка сервере
        const errorResponse = {
            status: "error",
            message: error.message
        }

        return new NextResponse(
            JSON.stringify(errorResponse),
            {
                status: 500,
                headers: {
                    "Content-Type": "application/json"
                }
            })
    }
}

export async function DELETE(
    request: Request,
    {params}: { params: { id: string } }) {
    console.log(params)
    const ids = params.id.split(',').map(Number)
    console.log(ids)
    try {
        const {id} = params
        const data = await prisma.good.deleteMany({
            where: {
                id: {in: [...ids]}
            }
        })
        return new NextResponse(
            JSON.stringify(data),
            {status: 202})

    } catch (error: any) {
        if (error.code === "P2025") {
            const errorResponse = {
                status: "fail",
                message: "No Good with the Provided ID Found",
            }

            return new NextResponse(
                JSON.stringify(errorResponse),
                {
                    status: 404,
                    headers: {"Content-Type": "application/json"}
                }
            )
        }

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