import React from 'react';

import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';

const IssueForm = dynamic(() => import(`@/app/issues/_components/IssueForm`), {
   ssr: false,
});

interface Props {
   params: { id: string };
}

async function EditIssuePage({ params }: Props) {
   const issue = await prisma.issue.findUnique({
      where: { id: +params.id },
   });

   if (!issue) notFound();

   return <IssueForm issue={issue} />;
}

export default EditIssuePage;
