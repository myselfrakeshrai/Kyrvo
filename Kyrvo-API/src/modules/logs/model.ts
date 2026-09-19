import { z } from "zod";
import * as baseModel from "shared/baseModel";
const TABLE = "Logs";

export const LogSchema = z.object({
  Id: z.string(),
  ActionType: z.string(),
  DataId: z.string(),
  TableName: z.string(),
  Columns: z.string(),
  Data: z.string(),
  Remarks: z.string(),
  Successful: z.number(),
  ActionTyp: z.string(),
  CreatedOn: z.number().optional(),
  UpdatedOn: z.number().optional(),
});

export type Log = z.infer<typeof LogSchema>;

export const logModel = baseModel.defaultActions<Log>(TABLE);
