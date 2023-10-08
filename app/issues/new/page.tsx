'use client';

import { TextField, TextArea, Button } from '@radix-ui/themes';
import React from 'react';

function page() {
   return (
      <div className='max-w-xl space-y-3'>
         <TextField.Root>
            <TextField.Input placeholder='Title' />
         </TextField.Root>
         <TextArea placeholder='Description...' />
         <Button>Submit New Issue</Button>
      </div>
   );
}

export default page;
