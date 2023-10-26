import prisma from '@/prisma/client';
import { Avatar, Card, Flex, Heading, Table } from '@radix-ui/themes';
import Link from 'next/link';
import IssueStatusBadge from './components/IssueStatusBadge';

async function LatestIssues() {
   const issues = await prisma.issue.findMany({
      orderBy: {
         createdAt: 'desc',
      },
      take: 5,
      include: {
         assignedToUser: true,
      },
   });
   return (
      <Card>
         <Heading size='6' mb={'3'}>
            Latest Issues
         </Heading>
         <Table.Root>
            <Table.Body>
               {issues.map((issue) => (
                  <Table.Row key={issue.id}>
                     <Table.Cell>
                        <Flex justify='between'>
                           <Flex direction='column' gap={'2'} align='start'>
                              <Link href={`/issues/${issue.id}`}>
                                 {issue.title}
                              </Link>
                              <IssueStatusBadge status={issue.status} />
                           </Flex>
                           {issue.assignedToUser && (
                              <Avatar
                                 src={issue.assignedToUser.image!}
                                 fallback='?'
                                 size='4'
                                 radius='full'
                              />
                           )}
                        </Flex>
                     </Table.Cell>
                  </Table.Row>
               ))}
            </Table.Body>
         </Table.Root>
      </Card>
   );
}

export default LatestIssues;
