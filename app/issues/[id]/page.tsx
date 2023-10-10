import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import prisma from '@/prisma/client';
import { Heading, Text, Flex, Card } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import React from 'react';

interface Props {
   params: { id: string };
}

async function IssueDetailPage({ params }: Props) {
   const issue = await prisma.issue.findUnique({
      where: { id: +params.id },
   });

   //Todo: checking if issue not found and calling built-in function notFound
   if (!issue) notFound();

   return (
      <div>
         <Heading>{issue.title}</Heading>
         <Flex className='space-x-3' my='2'>
            <IssueStatusBadge status={issue.status} />
            <Text>{issue.createdAt.toDateString()}</Text>
         </Flex>
         <Card>
            <Text>{issue.description}</Text>
         </Card>
      </div>
   );
}

export default IssueDetailPage;
