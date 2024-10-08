import { dynamoDB } from "../../utils/db";
import { getCurrentTimestamp } from "../../utils/helper";

const customerTableName = "Customers";

/**
 * The function `getCustomerById` retrieves a customer record from a DynamoDB table based on the
 * provided ID.
 * @param {string} id - The `id` parameter in the `getCustomerById` function is a string that
 * represents the unique identifier of the customer whose information you want to retrieve from the
 * DynamoDB table.
 * @returns The function `getCustomerById` is returning the item corresponding to the provided `id`
 * from the DynamoDB table named `customerTableName`.
 */
export const getCustomerById = async (id: string) => {
  const result = await dynamoDB
    .get({
      TableName: customerTableName,
      Key: { id },
    })
    .promise();

  return result.Item;
};

/**
 * This function retrieves all customers from a DynamoDB table asynchronously.
 * @returns The function `getAllCustomers` is returning the list of items retrieved from the DynamoDB
 * table specified by `customerTableName`.
 */
export const getAllCustomers = async () => {
  const result = await dynamoDB
    .scan({
      TableName: customerTableName,
    })
    .promise();

  return result.Items;
};

/**
 * The `createCustomer` function in TypeScript creates a new customer record in a DynamoDB table with
 * provided name and email fields along with timestamps.
 * @param  - The `createCustomer` function is an asynchronous function that takes an object as a
 * parameter with `name` and `email` properties, both of type string. It creates a new customer object
 * with an `id`, `name`, `email`, `createdAt`, and `updatedAt` properties. The `
 * @returns The `createCustomer` function is returning the customer object that was created and stored
 * in the DynamoDB table.
 */
export const createCustomer = async ({
  name,
  email,
}: {
  name: string;
  email: string;
}): Promise<any> => {
  const customer = {
    id: Date.now().toString(),
    name,
    email,
    createdAt: getCurrentTimestamp(), // Set created timestamp
    updatedAt: getCurrentTimestamp(), // Set updated timestamp
  };

  await dynamoDB
    .put({
      TableName: customerTableName,
      Item: customer,
    })
    .promise();

  return customer;
};
