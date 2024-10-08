import { dynamoDB } from "../utils/db";
import { createDeal, getDealById, getDeals } from "../controllers/Deal";
import { CreateDealInput } from "../utils/interfaces/Deal";

export const dealResolver = {
  Query: {
    deal: async (_: any, args: { id: string }) => {
      const result = await getDealById(args.id);
      return result;
    },

    deals: async () => {
      const result = await getDeals();
      return result;
    },
  },
  Mutation: {
    createDeal: async (_: any, args: CreateDealInput) => {
      const deal = await createDeal(args);
      return deal;
    },
  },
};

export default dealResolver;
