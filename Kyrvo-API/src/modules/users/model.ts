import { z } from 'zod';
import { defaultActions, get, remove } from 'shared/baseModel';
const TABLE = 'User';
export const UserSchema = z.object({
  Id: z.string(),
  Email: z.string(),
  FirstName: z.string(),
  LastName: z.string(),
  Pwd: z.string(),
  RoleId: z.string(),
  IsNew: z.number(),
  IsVerified: z.string(),
  PhoneNumber: z.string(),
  VerificationToken: z.string(),
  CreatedOn: z.number().optional(),
  UpdatedOn: z.number().optional(),
});

export type User = z.infer<typeof UserSchema>;
export const userModel = {
  ...defaultActions<User>(TABLE),
  ...{
    getUserForRegistration: async (Db: D1Database, id: string) => {
      return get<User[]>(Db, TABLE, {
        conditions: 'VerificationToken=?1 and IsNew=1 and IsVerified < 1',
        params: [id],
      });
    },
    editRole: async (
      d1: D1Database,
      param: User,
    ): Promise<User | undefined> => {
      return remove<User>(d1, TABLE, {
        conditions: 'Id = ?1',
        params: [param.Id],
      });
    },
  },
};
