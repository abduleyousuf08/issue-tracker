import { z } from 'zod';

//Todo: validation data setup
export const issueSchema = z.object({
   title: z.string().min(1).max(255),
   description: z.string().min(1),
});

export const updateIssue = z.object({
   title: z.string().max(255),
   description: z.string(),
});
