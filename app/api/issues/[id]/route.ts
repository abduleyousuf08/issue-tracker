import { NextRequest, NextResponse } from 'next/server';
import { updateIssue } from '@/app/ValidationSchemas';
import prisma from '@/prisma/client';

export async function PATCH(
   request: NextRequest,
   { params }: { params: { id: string } }
) {
   const body = await request.json();
   const validation = updateIssue.safeParse(body);

   if (!validation.success) {
      return NextResponse.json(validation.error.format(), { status: 400 });
   }

   const issue = await prisma.issue.findUnique({
      where: { id: +params.id },
   });

   if (!issue) {
      return NextResponse.json({ error: 'Invalid issue' }, { status: 404 });
   }

   const updatedIssue = await prisma.issue.update({
      where: { id: issue.id },
      data: {
         title: body.title || issue.title,
         description: body.description || issue.description,
      },
   });

   return NextResponse.json(updatedIssue);
}
