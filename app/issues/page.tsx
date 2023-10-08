import React from 'react';
import { Button } from '@radix-ui/themes';
import Link from 'next/link';

function IssuesPage() {
   return (
      <Button>
         <Link href='/issues/new'>New Issue</Link>
      </Button>
   );
}

export default IssuesPage;
