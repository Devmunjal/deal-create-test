/* This code snippet is defining a resolver object for a GraphQL schema. The resolver object contains
functions that define how to retrieve data for different GraphQL operations (queries and mutations). */
import {
  createCustomer,
  getAllCustomers,
  getCustomerById,
} from "../controllers/Customer";

const customerResolver = {
  Query: {
    customer: async (_: any, args: { id: string }) => {
      const customer = await getCustomerById(args.id);
      return customer;
    },

    customers: async () => {
      const result = await getAllCustomers();
      return result;
    },
  },
  Mutation: {
    createCustomer: async (_: any, args: { name: string; email: string }) => {
      const customer = await createCustomer(args);

      return customer;
    },
  },
};

export default customerResolver;
