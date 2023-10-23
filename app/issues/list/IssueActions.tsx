import React from 'react';
import { Button, Flex } from '@radix-ui/themes';
import Link from 'next/link';
import IssueFilter from './IssueFilter';

function IssueActions() {
   return (
      <Flex mb='5' justify='between'>
         <IssueFilter />
         <Button>
            <Link href='/issues/new'>New Issue</Link>
         </Button>
      </Flex>
   );
}

export default IssueActions;
