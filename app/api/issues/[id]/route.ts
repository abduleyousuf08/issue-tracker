import { NextRequest, NextResponse } from 'next/server';
import { updateIssueSchema } from '@/app/ValidationSchemas';
import prisma from '@/prisma/client';
import authOptions from '@/app/auth/authOptions';
import { getServerSession } from 'next-auth';

export async function PATCH(
   request: NextRequest,
   { params }: { params: { id: string } }
) {
   //* STATES
   const body = await request.json();
   const { assignedToUserId } = body;
   const validation = updateIssueSchema.safeParse(body);
   const session = await getServerSession(authOptions);

   //? session validation
   if (!session) return NextResponse.json({}, { status: 401 });

   //Todo: assigned user validation
   if (assignedToUserId) {
      const user = await prisma.user.findUnique({
         where: { id: assignedToUserId },
      });

      if (!user) {
         return NextResponse.json('Invalid user.', { status: 400 });
      }
   }

   //? Validation status checking
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
         assignedToUserId: assignedToUserId || null,
      },
   });

   return NextResponse.json(updatedIssue);
}

//Todo: Delete functionality

export async function DELETE(
   request: NextRequest,
   { params }: { params: { id: string } }
) {
   const session = await getServerSession(authOptions);

   if (!session)
      return NextResponse.json(
         { error: 'try login before this route' },
         { status: 401 }
      );

   const issue = await prisma.issue.findUnique({
      where: {
         id: +params.id,
      },
   });

   if (!issue) {
      return NextResponse.json({ error: 'Issue Not found' }, { status: 404 });
   }

   await prisma.issue.delete({
      where: { id: +params.id },
   });

   return NextResponse.json({});
}
