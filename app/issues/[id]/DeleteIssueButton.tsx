import React from 'react';
import { Button } from '@radix-ui/themes';

interface Props {
   issueId: number;
}

function DeleteIssueButton({ issueId }: Props) {
   return <Button color='red'>Delete Issue</Button>;
}

export default DeleteIssueButton;
