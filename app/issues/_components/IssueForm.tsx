'use client';

import { issueSchema } from '@/app/ValidationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import SimpleMDE from 'react-simplemde-editor';
import { z } from 'zod';

//*COMPONENTS
import ErrorMessage from '@/app/components/ErrorMessage';
import Loader from '@/app/components/Loader';
import { Issue } from '@prisma/client';

type IssueFormData = z.infer<typeof issueSchema>;

interface Props {
   issue?: Issue;
}

function IssueForm({ issue }: Props) {
   const router = useRouter();

   //Todo: useForm hook setup
   const {
      register,
      control,
      handleSubmit,
      formState: { errors },
   } = useForm<IssueFormData>({
      resolver: zodResolver(issueSchema),
   });

   //Todo:States
   const [error, setError] = useState('');
   const [isSubmiting, setIsSubmiting] = useState(false);

   //Todo: to Submit an issue
   const onSubmit = handleSubmit(async (data) => {
      try {
         setIsSubmiting(true);
         if (issue) {
            await axios.patch(`/api/issues/${issue.id}`, data);
         } else {
            await axios.post('/api/issues', data);
         }
         router.push('/issues/list');
         router.refresh();
      } catch (error) {
         setIsSubmiting(false);
         setError('An expected error occured.');
      }
   });

   return (
      <div className='max-w-xl '>
         {error && (
            <Callout.Root color='red' className='mb-5'>
               <Callout.Text>{error}</Callout.Text>
            </Callout.Root>
         )}
         <form className='max-w-xl space-y-3' onSubmit={onSubmit}>
            <TextField.Root>
               <TextField.Input
                  defaultValue={issue?.title}
                  placeholder='Title'
                  {...register('title')}
               />
            </TextField.Root>

            <ErrorMessage>{errors.title?.message}</ErrorMessage>

            <Controller
               name='description'
               control={control}
               defaultValue={issue?.description}
               render={({ field }) => (
                  <SimpleMDE placeholder='Description...' {...field} />
               )}
            />

            <ErrorMessage>{errors.description?.message}</ErrorMessage>

            <Button disabled={isSubmiting}>
               {issue ? 'Update Issue' : 'Submit New Issue'}{' '}
               {isSubmiting && <Loader />}
            </Button>
         </form>
      </div>
   );
}

export default IssueForm;
