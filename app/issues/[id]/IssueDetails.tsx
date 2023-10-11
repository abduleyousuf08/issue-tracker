import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import { Issue } from '@prisma/client';
import { Heading, Text, Flex, Card } from '@radix-ui/themes';
import React from 'react';
import ReactMarkdown from 'react-markdown';

interface Props {
   issue: Issue;
}

function IssueDetails({ issue }: Props) {
   return (
      <div>
         <Heading>{issue.title}</Heading>
         <Flex className='space-x-3' my='2'>
            <IssueStatusBadge status={issue.status} />
            <Text>{issue.createdAt.toDateString()}</Text>
         </Flex>
         <Card className='prose' mt='4'>
            <ReactMarkdown>{issue.description}</ReactMarkdown>
         </Card>
      </div>
   );
}

export default IssueDetails;
