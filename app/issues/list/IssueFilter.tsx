'use client';

import React from 'react';
import { Select } from '@radix-ui/themes';
import { Status } from '@prisma/client';
import { useRouter, useSearchParams } from 'next/navigation';

function IssueFilter() {
   const router = useRouter();
   const searchParams = useSearchParams();

   const statuses: { label: string; value?: Status }[] = [
      { label: 'All' },
      { label: 'Open', value: 'OPEN' },
      { label: 'In progress', value: 'IN_PROGRESS' },
      { label: 'Closed', value: 'CLOSED' },
   ];

   return (
      <Select.Root
         defaultValue={searchParams.get('status') || ''}
         onValueChange={(status) => {
            const params = new URLSearchParams();
            if (status) params.append('status', status);
            if (searchParams.get('orderBy'))
               params.append('orderBy', searchParams.get('orderBy')!);

            const query = params.size ? '?' + params.toString() : '';
            router.push(`/issues/list` + query);
         }}
      >
         <Select.Trigger placeholder='Filter by status...' />
         <Select.Content>
            {statuses.map((status) => (
               <Select.Item key={status.value} value={status.value!}>
                  {status.label}
               </Select.Item>
            ))}
         </Select.Content>
      </Select.Root>
   );
}

export default IssueFilter;
