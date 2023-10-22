'use client';

import axios from 'axios';
import { Issue, User } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { nullable } from 'zod';

function AssigneeSelect({ issue }: { issue: Issue }) {
   const {
      data: users,
      error,
      isLoading,
   } = useQuery<User[]>({
      queryKey: ['users'],
      queryFn: () => axios.get('/api/users').then((res) => res.data),
      staleTime: 60 * 1000, //todo:60s
      retry: 3,
   });

   if (isLoading) return <Skeleton />;

   if (error) return null;

   return (
      <Select.Root
         defaultValue={issue.assignedToUserId || 'unassigned'}
         onValueChange={(userId: string | false) => {
            axios.patch('/api/issues/' + issue.id, {
               assignedToUserId: userId === 'unassigned' ? null : userId,
            });
         }}
      >
         <Select.Trigger placeholder='Assign...' />
         <Select.Content>
            <Select.Group>
               <Select.Label>Suggestions</Select.Label>
               <Select.Item value='unassigned'>Unassigned</Select.Item>
               {users?.map((user) => (
                  <Select.Item key={user.id} value={user.id}>
                     {user.name}
                  </Select.Item>
               ))}
            </Select.Group>
         </Select.Content>
      </Select.Root>
   );
}

export default AssigneeSelect;
