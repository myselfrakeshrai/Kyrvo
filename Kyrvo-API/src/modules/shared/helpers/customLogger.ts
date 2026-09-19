import { Log, logModel } from 'modules/logs/model';
export const logActivity = async (
  d1: D1Database,
  id: string,
  action: string,
  tableName: string,
  data: any,
  initial: any,
  success: number,
  userId: string,
  remarks?: string,
) => {
  const columns = [];
  const values = [];
  for (const key of Object.keys(data)) {
    if (
      data[key] !== initial[key] &&
      !(key.toUpperCase() === 'CREATEDON' || key.toUpperCase() === 'UPDATEDON')
    ) {
      columns.push(key);
      values.push(data[key]);
    }
  }
  const vals = {
    ActionType: action,
    DataId: id,
    Remarks: remarks || '',
    TableName: tableName,
    Successful: success,
    Columns: columns.join(', '),
    UserId: userId,
    Data: values.join(', '),
  };
  await logModel.create(d1, vals as unknown as Log);
};
