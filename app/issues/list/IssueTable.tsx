import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import { Issue, Status } from '@prisma/client';
import { ArrowUpIcon } from '@radix-ui/react-icons';
import { Link, Table, TableHeader } from '@radix-ui/themes';
import NextLink from 'next/link';

//! Don't change
interface Props {
   searchParams: {
      status: Status;
      orderBy: keyof Issue;
      page: string;
   };
   issues: Issue[];
}

function IssueTable({ searchParams, issues }: Props) {
   return (
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
   );
}

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

export const columnNames = columns.map((column) => column.value);

export default IssueTable;
