


import prisma from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'

export async function POST (request: Request) { 

    await prisma.todo.deleteMany();

    await prisma.todo.createMany({
        data: [
            { description: 'Buy Milk', complete: true },
            { description: 'Buy Eggs' },
            { description: 'Buy Bread' },
            { description: 'Buy Butter'},
        ]
    })

    return NextResponse.json({ message: 'Seed Excuted' })

}