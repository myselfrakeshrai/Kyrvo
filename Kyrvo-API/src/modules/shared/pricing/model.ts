import { z } from 'zod';
import { createDateFromDDMMYYYYHHMM, getDateOffsetByDays } from '../utils/misc';
import { defaultActions, all } from 'shared/baseModel';
const TABLE = 'Pricing';
export const PricingSchema = z.object({
  Id: z.string(),
  Description: z.string(),
  Name: z.string(),
  StartDate: z.string(),
  StartTime: z.string(),
  EndDate: z.string(),
  EndTime: z.string(),
  IsActive: z.number(),
  Priority: z.number(),
  Multiplier: z.number(),
  Code: z.string(),
  CreatedOn: z.number().optional(),
  UpdatedOn: z.number().optional(),
});
export type Pricing = z.infer<typeof PricingSchema>;
const getValidPricing = (data: Pricing[], date?: string) => {
  let validPrice = null;
  let validPriority = -1;
  for (let i = 0; i < data.length; i++) {
    const price = data[i];
    if (price.Priority > validPriority) {
      const cTime = date ? createDateFromDDMMYYYYHHMM(date) : new Date();
      const startDate = price.StartDate || getDateOffsetByDays(0, cTime);
      const endDate = price.EndDate || getDateOffsetByDays(0, cTime);
      const startTime = price.StartTime || '00:00:00';
      const endTime = price.EndTime || '00:00:00';
      const start = createDateFromDDMMYYYYHHMM(startDate + ' ' + startTime);
      const end = createDateFromDDMMYYYYHHMM(endDate + ' ' + endTime);
      if (
        cTime &&
        start &&
        cTime.getTime() >= start?.getTime() &&
        end &&
        cTime.getTime() <= end?.getTime()
      ) {
        validPrice = price;
        validPriority = price.Priority;
      }
    }
  }
  return validPrice;
};
export const pricingModel = {
  ...defaultActions<Pricing>(TABLE),
  ...{
    getApplicable: async (Db: D1Database, date?: string) => {
      const data = await all(Db, TABLE, {
        condition: { conditions: `Code=?1`, params: [''] },
      });
      return getValidPricing(data, date);
    },
    getValidPromo: async (Db: D1Database, code: string) => {
      const data = await all(Db, TABLE, {
        condition: { conditions: `Code=?1`, params: [code] },
      });
      return getValidPricing(data);
    },
  },
};
