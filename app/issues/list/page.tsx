import prisma from '@/prisma/client';
import { Flex } from '@radix-ui/themes';

//*COMPONENTS
import Pagination from '@/app/components/Pagination';
import { Issue, Status } from '@prisma/client';
import IssueActions from './IssueActions';
import IssueTable, { columnNames } from './IssueTable';

//! Don't change
interface Props {
   searchParams: { status: Status; orderBy: keyof Issue; page: string };
}

async function IssuesPage({ searchParams }: Props) {
   //Todo:- checking if status is valid status!
   const statuses = Object.values(Status);
   const status = statuses.includes(searchParams.status)
      ? searchParams.status
      : undefined;

   //Todo:- checking if orderBy exist!
   const orderBy = columnNames.includes(searchParams.orderBy)
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
      <Flex direction={'column'} gap={'3'}>
         <IssueActions />
         <IssueTable searchParams={searchParams} issues={issues} />
         <Pagination
            pageSize={pageSize}
            currentPage={page}
            itemCount={issueCount}
         />
      </Flex>
   );
}

export default IssuesPage;
