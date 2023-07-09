import {NextResponse} from 'next/server'
import {prisma} from '@/lib/prisma'

export async function GET(
    request: Request,
    {params}: { params: { id: string } }) {

    // const id =params.id
    const {id} = params
    console.log(id)

    if (id === null) {
        return NextResponse.json({status: 'Error'})
    }

    const good = await prisma.good.findUnique({
        where: {
            id: Number(id)
        }
    })

    return NextResponse.json({good})
}

