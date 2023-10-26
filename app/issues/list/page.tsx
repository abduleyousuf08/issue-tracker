import prisma from '@/prisma/client';
import { Flex, Table, TableHeader } from '@radix-ui/themes';

//*COMPONENTS
import { Issue, Status } from '@prisma/client';
import { ArrowUpIcon } from '@radix-ui/react-icons';
import NextLink from 'next/link';
import IssueStatusBadge from '../../components/IssueStatusBadge';
import Link from '../../components/Link';
import IssueActions from './IssueActions';
import Pagination from '@/app/components/Pagination';

//! Don't change
interface Props {
   searchParams: { status: Status; orderBy: keyof Issue; page: string };
}

async function IssuesPage({ searchParams }: Props) {
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

   //Todo:- checking if status is valid status!
   const statuses = Object.values(Status);
   const status = statuses.includes(searchParams.status)
      ? searchParams.status
      : undefined;

   //Todo:- checking if orderBy exist!
   const orderBy = columns
      .map((column) => column.value)
      .includes(searchParams.orderBy)
      ? { [searchParams.orderBy]: 'asc' }
      : undefined;

   const page = +searchParams.page || 1;
   const pageSize = 10;

   const issues = await prisma.issue.findMany({
      where: {
         status,
      },
      orderBy,
      skip: (page - 1) * pageSize,
      take: pageSize,
   });

   const issueCount = await prisma.issue.count({ where: { status } });

   return (
      <Flex direction={'column'} gap={'4'}>
         <IssueActions />
         <Table.Root variant='surface'>
            <TableHeader>
               <Table.Row>
                  {columns.map((column) => (
                     <Table.ColumnHeaderCell
                        key={column.value}
                        className={column.className}
                     >
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
         <Pagination
            pageSize={pageSize}
            currentPage={page}
            itemCount={issueCount}
         />
      </Flex>
   );
}

export default IssuesPage;
