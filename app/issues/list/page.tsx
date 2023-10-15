import prisma from '@/prisma/client';
import { Table, TableHeader } from '@radix-ui/themes';
import delay from 'delay';

//*COMPONENTS
import IssueStatusBadge from '../../components/IssueStatusBadge';
import Link from '../../components/Link';
import IssueActions from './IssueActions';

async function IssuesPage() {
   const issues = await prisma.issue.findMany();

   return (
      <div>
         <IssueActions />
         <Table.Root variant='surface'>
            <TableHeader>
               <Table.Row>
                  <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell className='hidden md:table-cell'>
                     Status
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell className='hidden md:table-cell'>
                     Created At
                  </Table.ColumnHeaderCell>
               </Table.Row>
            </TableHeader>
            <Table.Body>
               {issues.map((issue) => (
                  <Table.Row key={issue.id}>
                     <Table.Cell>
                        <Link href={`/issues/${issue.id}`}>{issue.title}</Link>

                        <div className='block md:hidden mt-2'>
                           <IssueStatusBadge status={issue.status} />
                        </div>
                     </Table.Cell>
                     <Table.Cell className='hidden md:table-cell'>
                        <IssueStatusBadge status={issue.status} />
                     </Table.Cell>
                     <Table.Cell className='hidden md:table-cell'>
                        {issue.createdAt.toDateString()}
                     </Table.Cell>
                  </Table.Row>
               ))}
            </Table.Body>
         </Table.Root>
      </div>
   );
}

export default IssuesPage;