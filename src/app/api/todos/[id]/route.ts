
import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server'
import * as yup from 'yup';

interface Segment{
    params: {
        id: string
    }
}

export async function GET(request: Request, segments: Segment) {

    const id = segments.params.id;

    const todo = await prisma.todo.findFirst({
        where: {
            id
        }
    })


    if(!todo) return NextResponse.json({ message: 'Todo not found' }, { status: 404 });


    return NextResponse.json(todo)


}

const putObjectSchema = yup.object().shape({
    description: yup.string().optional(),
    complete: yup.boolean().required()
});


export async function PUT(request: Request, segments: Segment) {
    
        const { id } = segments.params;
    
        const { description , complete, ...rest } = await request.json();
    

        try {
            await putObjectSchema.validate({
                description,
                complete
            });

            if( !(Object.keys(rest).length == 0) ) return NextResponse.json({ message: 'Invalid request, fields not valids' }, { status: 400 });


            const todo = await prisma.todo.update({
                where: {
                    id
                },
                data: {
                    description,
                    complete
                }
            })
        
            return NextResponse.json(todo)

        } catch (error: any) {
            console.log('es del catcha');
            return NextResponse.json({ message: error.message }, { status: 400 });
        }
    
    }