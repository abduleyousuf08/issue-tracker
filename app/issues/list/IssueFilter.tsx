'use client';

import React from 'react';
import { Select } from '@radix-ui/themes';
import { Status } from '@prisma/client';
import { useRouter } from 'next/navigation';

function IssueFilter() {
   const router = useRouter();

   const statuses: { label: string; value?: Status | null }[] = [
      { label: 'All' },
      { label: 'Open', value: 'OPEN' },
      { label: 'In progress', value: 'IN_PROGRESS' },
      { label: 'Closed', value: 'CLOSED' },
   ];

   return (
      <Select.Root
         onValueChange={(status) => {
            const query = status !== 'All' ? `?status=${status}` : '';
            router.push(`/issues/list` + query);
         }}
      >
         <Select.Trigger placeholder='Filter by status...' />
         <Select.Content>
            {statuses.map((status) => (
               <Select.Item
                  key={status.value}
                  value={status.value ? status.value : 'All'}
               >
                  {status.label}
               </Select.Item>
            ))}
         </Select.Content>
      </Select.Root>
   );
}

export default IssueFilter;
