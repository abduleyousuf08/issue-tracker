'use client';

import { createIssueSchema } from '@/app/ValidationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

//*COMPONENTS
import ErrorMessage from '@/app/components/ErrorMessage';
import Loader from '@/app/components/Loader';

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
   ssr: false,
});

type IssueForm = z.infer<typeof createIssueSchema>;

function NewIssuePage() {
   const router = useRouter();

   //Todo: useForm hook setup
   const {
      register,
      control,
      handleSubmit,
      formState: { errors },
   } = useForm<IssueForm>({
      resolver: zodResolver(createIssueSchema),
   });

   //Todo:States
   const [error, setError] = useState('');
   const [isSubmiting, setIsSubmiting] = useState(false);

   //Todo: to Submit an issue
   const onSubmit = handleSubmit(async (data) => {
      try {
         setIsSubmiting(true);
         await axios.post('/api/issues', data);
         router.push('/issues');
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
               <TextField.Input placeholder='Title' {...register('title')} />
            </TextField.Root>

            <ErrorMessage>{errors.title?.message}</ErrorMessage>

            <Controller
               name='description'
               control={control}
               render={({ field }) => (
                  <SimpleMDE placeholder='Description...' {...field} />
               )}
            />

            <ErrorMessage>{errors.description?.message}</ErrorMessage>

            <Button disabled={isSubmiting}>
               Submit New Issue {isSubmiting && <Loader />}
            </Button>
         </form>
      </div>
   );
}

export default NewIssuePage;
