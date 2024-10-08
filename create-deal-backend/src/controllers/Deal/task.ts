import { taskTableName } from "../../utils/constants";
import { dynamoDB } from "../../utils/db";
import { getCurrentTimestamp } from "../../utils/helper";

/**
 * The function `getDealById` retrieves a deal from a DynamoDB table based on the provided dealId.
 * @param {string} dealId - The `dealId` parameter is a string that represents the unique identifier of
 * a deal. This identifier is used to query the DynamoDB table to retrieve information about a specific
 * deal.
 * @returns The function `getDealById` is returning the items that match the query for the specified
 * `dealId` from the DynamoDB table.
 */
export const getTasksByDealId = async (dealId: string) => {
  const result = await dynamoDB
    .query({
      TableName: taskTableName,
      KeyConditionExpression: "dealId = :dealId",
      ExpressionAttributeValues: {
        ":dealId": dealId,
      },
    })
    .promise();

  return result.Items;
};
/**
 * The createTask function creates a new task with specified title, status, and deal ID, and stores it
 * in a DynamoDB table with timestamps for creation and update.
 * @param args - The `createTask` function takes in an object `args` with the following properties:
 * @returns The `createTask` function is returning the `task` object that was created and saved in the
 * DynamoDB table.
 */

export const createTask = async (args: {
  title: string;
  status: string;
  dealId: string;
}): Promise<any> => {
  const task = {
    id: Date.now().toString(),
    title: args.title,
    status: args.status,
    dealId: args.dealId,
    createdAt: getCurrentTimestamp(), // Set created timestamp
    updatedAt: getCurrentTimestamp(), // Set updated timestamp
  };
  await dynamoDB
    .put({
      TableName: taskTableName,
      Item: task,
    })
    .promise();

  return task;
};
