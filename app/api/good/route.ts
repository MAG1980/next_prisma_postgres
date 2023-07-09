import {NextResponse} from 'next/server'
import {prisma} from '@/lib/prisma'

export async function GET(request: Request) {
    const {searchParams} = new URL(request.url)
    const id = Number(searchParams.get('id'))
    console.log(id)

    if (id === null) {
        return NextResponse.json({status: 'Error'})
    }

    const good = await prisma.good.findUnique({
        where: {
            id: id
        }
    })

    return NextResponse.json({good})
}

