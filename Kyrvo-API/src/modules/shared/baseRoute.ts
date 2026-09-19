import { generateResponse } from 'helpers/responseHelper';
import { COULDNT_ADD_DATA, NO_RECORDS_FOUND } from 'utils/messages';
import { BaseType } from 'shared/baseModel';
import { logActivity } from 'helpers/customLogger';

const baseRoute = <T>(model: BaseType) => {
  return {
    getAll: async (c: any) => {
      const data = (await model.getAll(c.env.ae_d1)) as T[];
      return generateResponse(c, data || [], 404, NO_RECORDS_FOUND);
    },
    get: async (c: any) => {
      const { Id } = await c.req.valid('param');
      const dataObj = (await model.getById(c.env.ae_d1, Id)) as T;
      return generateResponse(c, dataObj, 422, NO_RECORDS_FOUND);
    },
    getBy: async (c: any) => {
      const { col, val } = await c.req.valid('param');
      const limit = c.req.queries('limit');
      const dataObj = (await model.getBy(c.env.ae_d1, col, val, limit)) as T[];
      return generateResponse(c, dataObj, 422, NO_RECORDS_FOUND);
    },
    getColumns: async (c: any, columns: string[]) => {
      const dataObj = (await model.getColumns(c.env.ae_d1, columns)) as T[];
      return generateResponse(c, dataObj, 422, NO_RECORDS_FOUND);
    },
    getWithFilters: async (c: any, columns: string[], values: any[]) => {
      const limit = c.req.queries('limit');
      const dataObj = (await model.getAllWithFilter(
        c.env.ae_d1,
        columns,
        values,
        limit,
      )) as T[];
      return generateResponse(c, dataObj, 422, NO_RECORDS_FOUND);
    },
    post: async (c: any) => {
      const param = await c.req.valid('json');
      const createdObj = await model.create(c.env.ae_d1, param as T);
      const userId = c.get('userId');
      await logActivity(
        c.env.ae_d1,
        createdObj.Id,
        'CREATE',
        model.getTableName(),
        param as BaseType,
        {},
        1,
        userId,
      );
      return generateResponse(c, createdObj, 422, COULDNT_ADD_DATA);
    },
    put: async (c: any) => {
      const param = (await c.req.valid('json')) as T;
      const { Id } = await c.req.valid('param');
      const initObj = await model.getById(c.env.ae_d1, Id);
      const userId = c.get('userId');
      const updatedObj = (await model.updateById(c.env.ae_d1, param, Id)) as T;
      await logActivity(
        c.env.ae_d1,
        Id,
        'UPDATE',
        model.getTableName(),
        param as BaseType,
        initObj,
        1,
        userId,
      );
      return generateResponse(c, updatedObj, 422, COULDNT_ADD_DATA);
    },
    delete: async (c: any) => {
      const { Id } = await c.req.param();
      const deletedObj = await model.deleteById(c.env.ae_d1, Id);
      return generateResponse(c, deletedObj, 422, COULDNT_ADD_DATA);
    },
  };
};

export default baseRoute;
