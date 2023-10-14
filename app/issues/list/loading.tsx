import React from 'react';
import { Table, TableHeader } from '@radix-ui/themes';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import IssueActions from './IssueActions';

function LoadingIssuePage() {
   const issues = [1, 2, 3, 4, 5];
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
                  <Table.Row key={issue}>
                     <Table.Cell>
                        <Skeleton />
                        <div className='block md:hidden'>
                           <Skeleton />
                        </div>
                     </Table.Cell>
                     <Table.Cell className='hidden md:table-cell'>
                        <Skeleton />
                     </Table.Cell>
                     <Table.Cell className='hidden md:table-cell'>
                        <Skeleton />
                     </Table.Cell>
                  </Table.Row>
               ))}
            </Table.Body>
         </Table.Root>
      </div>
   );
}

export default LoadingIssuePage;
