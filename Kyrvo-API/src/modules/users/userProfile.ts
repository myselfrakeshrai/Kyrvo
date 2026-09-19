import { z } from 'zod';
export const UserProfileSchema = z.object({
  Id: z.string(),
  Email: z.string(),
  FirstName: z.string(),
  LastName: z.string(),
});

export type UserProfile = z.infer<typeof UserProfileSchema>;

