import { D1QB, Where, OrderTypes } from 'workers-qb';

const addTimestamps = (params: any, createdOn: boolean, updatedOn: boolean) => {
  if (createdOn) {
    params['CreatedOn'] = new Date().getTime();
  }
  if (updatedOn) {
    params['updatedOn'] = new Date().getTime();
  }
  return params;
};

export interface BaseType {
  [key: string]: (...args: any[]) => any;
}

export const all = async <T>(
  d1: D1Database,
  tableName: string,
  options?: {
    condition?: Where;
    orderBy?:
      | string
      | Array<string>
      | Record<string, string | OrderTypes>
      | undefined;
    limit?: number;
  },
): Promise<any> => {
  const qb = new D1QB(d1);
  try {
    const builder: any = { tableName, fields: ['*'] };
    if (options) {
      if (options.condition) {
        builder['where'] = options.condition;
      }
      if (options.orderBy) {
        builder['orderBy'] = options.orderBy;
      }
      if (options.limit) {
        builder['limit'] = options.limit;
      }
    }
    const fetched = await qb.fetchAll(builder).execute();
    return fetched.results as T;
  } catch (e) {
    console.log(e);
  }
  return;
};

export const get = async <T>(
  d1: D1Database,
  table: string,
  condition: Where,
): Promise<any> => {
  const qb = new D1QB(d1);
  try {
    const selected = await qb
      .fetchOne({
        tableName: table,
        fields: ['*'],
        where: condition,
      })
      .execute();
    return selected.results as T;
  } catch (e) {
    console.log('DB error occur');
    console.log(e);
  }
  return;
};

export const create = async <T>(
  d1: D1Database,
  table: string,
  params: any,
  Id: any = undefined,
): Promise<any | undefined> => {
  const qb = new D1QB(d1);
  try {
    params = addTimestamps(params, true, false);
    if (!params.Id) {
      params.Id = Id || crypto.randomUUID();
    }
    const inserted = await qb
      .insert({
        tableName: table,
        data: params,
        returning: '*',
      })
      .execute();
    if (inserted.results) {
      return inserted.results as T;
    }
  } catch (e) {
    console.log(e);
  }
  return;
};

export const patch = async <T>(
  d1: D1Database,
  table: string,
  param: any,
  condition: Where,
): Promise<any | undefined> => {
  const qb = new D1QB(d1);
  try {
    param = addTimestamps(param, false, true);
    const updated = await qb
      .update({
        tableName: table,
        data: param,
        where: condition,
        returning: '*',
      })
      .execute();
    if (updated.results) {
      return updated.results[0] as T;
    }
  } catch (e) {
    console.log(e);
  }
  return;
};

export const remove = async <T>(
  d1: D1Database,
  table: string,
  condition: Where,
): Promise<any> => {
  const qb = new D1QB(d1);
  try {
    const deleted = await qb
      .delete({
        tableName: table,
        where: condition,
        returning: '*',
      })
      .execute();

    if (deleted.results) {
      return deleted.results[0] as T;
    }
  } catch (e) {
    console.log(e);
  }
  return;
};

export const defaultActions = <T>(TABLE: string) => {
  return {
    getTableName: (): string => TABLE,
    getAll: (d1: D1Database, limit?: number): Promise<T> =>
      all(d1, TABLE, { limit, orderBy: { createdOn: OrderTypes.DESC } }),
    getAllWithFilter: (
      d1: D1Database,
      columns: string[],
      values: any[],
      limit?: number,
    ): Promise<T> =>
      all(d1, TABLE, {
        condition: {
          conditions: columns
            .map((col, index) => `${col}=?${index + 1}`)
            .join(' and '),
          params: values,
        },
        limit,
        orderBy: { createdOn: OrderTypes.DESC },
      }),
    getById: (d1: D1Database, Id: any): Promise<T> =>
      get(d1, TABLE, { conditions: 'Id= ?1', params: [Id] }),
    create: (d1: D1Database, param: T, Id: any = undefined): Promise<T> =>
      create(d1, TABLE, param, Id),
    updateById: (d1: D1Database, param: T, Id: string | number): Promise<T> =>
      patch(d1, TABLE, param, { conditions: 'Id = ?1', params: [Id] }),
    updateBy: (
      d1: D1Database,
      param: T,
      column: string,
      value: string,
    ): Promise<T> =>
      patch(d1, TABLE, param, { conditions: `${column}=?1`, params: [value] }),
    deleteById: (d1: D1Database, Id: string | number): Promise<T> =>
      remove(d1, TABLE, { conditions: 'Id = ?1', params: [Id] }),
    getBy: (
      d1: D1Database,
      column: string,
      value: any,
      limit?: any,
    ): Promise<T[]> =>
      all(d1, TABLE, {
        condition: { conditions: `${column}=?1`, params: [value] },
        orderBy: { createdOn: OrderTypes.DESC },
        limit,
      }),
  };
};
