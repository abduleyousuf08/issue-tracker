import { z } from 'zod';

//Todo: validation data setup
export const createIssueSchema = z.object({
   title: z.string().min(1).max(255),
   description: z.string().min(1),
});
