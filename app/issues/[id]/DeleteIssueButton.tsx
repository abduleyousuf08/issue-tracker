'use client';

import React, { useState } from 'react';
import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';

//*COMPONENTS
import Loader from '@/app/components/Loader';

interface Props {
   issueId: number;
}

function DeleteIssueButton({ issueId }: Props) {
   const router = useRouter();
   const [error, setError] = useState(false);
   const [isDeleting, setIsDeleting] = useState(false);

   async function handleDeleteIssue() {
      try {
         setIsDeleting(true);
         await axios.delete(`/api/issues/${issueId}`);
         router.push('/issues/list');
         router.refresh();
      } catch (error) {
         setIsDeleting(false);
         setError(true);
      }
   }

   return (
      <>
         <AlertDialog.Root>
            <AlertDialog.Trigger>
               <Button color='red' disabled={isDeleting}>
                  Delete Issue
                  {isDeleting && <Loader />}
               </Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content>
               <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
               <AlertDialog.Description>
                  Are you sure you want to delete this issue ? This action
                  cannot be undone.
               </AlertDialog.Description>

               <Flex mt='4' gap='4'>
                  <AlertDialog.Cancel>
                     <Button variant='soft' color='gray'>
                        Cancel
                     </Button>
                  </AlertDialog.Cancel>
                  <AlertDialog.Action>
                     <Button color='red' onClick={handleDeleteIssue}>
                        Delete Issue
                     </Button>
                  </AlertDialog.Action>
               </Flex>
            </AlertDialog.Content>
         </AlertDialog.Root>

         <AlertDialog.Root open={error}>
            <AlertDialog.Content>
               <AlertDialog.Title>Error</AlertDialog.Title>
               <AlertDialog.Description>
                  This issue could not be deleted !
               </AlertDialog.Description>
               <Button
                  color='gray'
                  variant='soft'
                  mt='3'
                  onClick={() => setError(false)}
               >
                  Ok
               </Button>
            </AlertDialog.Content>
         </AlertDialog.Root>
      </>
   );
}

export default DeleteIssueButton;
