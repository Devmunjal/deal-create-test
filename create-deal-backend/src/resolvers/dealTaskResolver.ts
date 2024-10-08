import { createTask, getTasksByDealId } from "../controllers/Deal/task";

export const dealTaskResolver = {
  Query: {
    tasks: async (_: any, args: { dealId: string }) => {
      const result = await getTasksByDealId(args.dealId);
      return result;
    },
  },
  Mutation: {
    createTask: async (
      _: any,
      args: { title: string; status: string; dealId: string }
    ) => {
      const task = await createTask(args);
      return task;
    },
  },
};

export default dealTaskResolver;
