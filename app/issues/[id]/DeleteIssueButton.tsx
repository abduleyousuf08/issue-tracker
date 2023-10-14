'use client';

import React from 'react';
import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface Props {
   issueId: number;
}

function DeleteIssueButton({ issueId }: Props) {
   const router = useRouter();

   async function handleDeleteIssue() {
      try {
         await axios.delete(`/api/issues/${issueId}`);
         router.push('/issues');
         router.refresh();
      } catch (error) {
         console.log(error);
      }
   }

   return (
      <AlertDialog.Root>
         <AlertDialog.Trigger>
            <Button color='red'>Delete Issue</Button>
         </AlertDialog.Trigger>
         <AlertDialog.Content>
            <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
            <AlertDialog.Description>
               Are you sure you want to delete this issue ? This action cannot
               be undone.
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
   );
}

export default DeleteIssueButton;
