import prisma from '@/prisma/client';
import { Table, TableHeader } from '@radix-ui/themes';
import delay from 'delay';

//*COMPONENTS
import IssueStatusBadge from '../../components/IssueStatusBadge';
import Link from '../../components/Link';
import NextLink from 'next/link';
import IssueActions from './IssueActions';
import { Issue, Status } from '@prisma/client';
import { ArrowUpIcon } from '@radix-ui/react-icons';

interface Props {
   searchParams: { status: Status; orderBy: keyof Issue };
}

async function IssuesPage({ searchParams }: Props) {
   //Todo:- checking if status is valid status!
   const statuses = Object.values(Status);
   const status = statuses.includes(searchParams.status)
      ? searchParams.status
      : undefined;

   const issues = await prisma.issue.findMany({
      where: {
         status,
      },
   });

   const columns: {
      label: String;
      value: keyof Issue;
      className?: string;
   }[] = [
      { label: 'Issue', value: 'title' },
      { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
      {
         label: 'Created At',
         value: 'createdAt',
         className: 'hidden md:table-cell',
      },
   ];

   return (
      <>
         <IssueActions />
         <Table.Root variant='surface'>
            <TableHeader>
               <Table.Row>
                  {columns.map((column) => (
                     <Table.ColumnHeaderCell key={column.value}>
                        <NextLink
                           href={{
                              query: { ...searchParams, orderBy: column.value },
                           }}
                        >
                           {column.label}
                           {column.value === searchParams.orderBy && (
                              <ArrowUpIcon className='inline ml-2' />
                           )}
                        </NextLink>
                     </Table.ColumnHeaderCell>
                  ))}
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
      </>
   );
}

export default IssuesPage;
