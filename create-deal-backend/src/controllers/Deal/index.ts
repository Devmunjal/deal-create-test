import { customerTableName, dealTableName } from "../../utils/constants";
import { dynamoDB } from "../../utils/db";
import { getCurrentTimestamp } from "../../utils/helper";
import { CreateDealInput } from "../../utils/interfaces/Deal";

// Helper Section

/**
 * The function `getDealWithCustomer` retrieves a customer's information from a DynamoDB table based on
 * a deal's customer ID.
 * @param {any} deal - The `deal` parameter is an object that represents a deal. It likely contains
 * information about a business deal or transaction, such as deal details, deal ID, customer ID, etc.
 * @returns The function `getDealWithCustomer` is returning a new object that includes the original
 * `deal` object and a new property `customer` which contains the result of fetching a customer from a
 * DynamoDB table using the `customerId` from the `deal` object.
 */
const getDealWithCustomer = async (deal: any) => {
  const customerResult = await dynamoDB
    .get({
      TableName: customerTableName,
      Key: { id: deal.customerId },
    })
    .promise();

  return {
    ...deal,
    customer: customerResult.Item,
  };
};

/**
 * The function `getDealById` retrieves a deal from a DynamoDB table based on the provided ID.
 * @param {string} id - The `id` parameter in the `getDealById` function is a string that
 * represents the unique identifier of the deal whose information you want to retrieve from the
 * DynamoDB table.
 * @returns The function `getDealById` is returning the item corresponding to the provided `id`
 * from the DynamoDB table named `dealTableName`.
 */
export const getDealById = async (id: string) => {
  const result = await dynamoDB
    .get({
      TableName: dealTableName,
      Key: { id },
    })
    .promise();

  return result.Item;
};

/**
 * The function `getDeals` retrieves deals from a DynamoDB table and includes customer information for
 * each deal.
 * @returns The `getDeals` function is returning an array of deals with additional customer
 * information. Each deal object in the array will have a `customer` property that contains information
 * about the customer associated with that deal.
 */
export const getDeals = async () => {
  const result = await dynamoDB
    .scan({
      TableName: dealTableName,
      ScanIndexForward: false, // Sort in descending order
    })
    .promise();

  const dealsWithCustomer = await Promise.all(
    result.Items.map(getDealWithCustomer)
  );

  return dealsWithCustomer;
};

/**
 * The `createDeal` function in TypeScript creates a new deal record in a DynamoDB table with required
 * fields and returns the deal with associated customer information.
 * @param {CreateDealInput} args - The `createDeal` function is designed to create a new deal in a
 * DynamoDB table. It takes in an argument `args` of type `CreateDealInput`, which should contain the
 * following properties:
 * @returns The `createDeal` function is returning a deal object with additional customer information
 * fetched from the `getDealWithCustomer` function. The deal object includes properties such as id,
 * customerId, street, city, state, zip, images, roomAreaInMeters, peopleRequired, status, createdAt,
 * and updatedAt.
 */
export const createDeal = async (args: CreateDealInput) => {
  if (
    !args.customerId ||
    !args.street ||
    !args.city ||
    !args.state ||
    !args.zip ||
    !args.roomAreaInMeters ||
    !args.peopleRequired ||
    !args.status
  ) {
    throw new Error("Fields cannot be empty");
  }
  const deal = {
    id: Date.now().toString(),
    customerId: args.customerId,
    street: args.street,
    city: args.city,
    state: args.state,
    zip: args.zip,
    images: args?.images || [],
    roomAreaInMeters: args.roomAreaInMeters,
    peopleRequired: args.peopleRequired,
    status: args.status,
    createdAt: getCurrentTimestamp(), // Set created timestamp
    updatedAt: getCurrentTimestamp(), // Set updated timestamp
  };

  await dynamoDB
    .put({
      TableName: dealTableName,
      Item: deal,
    })
    .promise();

  const dealWithCustomer = await getDealWithCustomer(deal);

  return dealWithCustomer;
};
