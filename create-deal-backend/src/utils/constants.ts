export const dealTableName = "Deals";
export const customerTableName = "Customers";
export const taskTableName = "Tasks";

export const customers = [
  {
    name: "John Doe",
    email: "john@example.com",
  },
  {
    name: "Jane Doe",
    email: "jane@example.com",
  },
  {
    name: "Bob Smith",
    email: "bob@example.com",
  },
  {
    name: "Alice Johnson",
    email: "alice@example.com",
  },
  {
    name: "Mike Brown",
    email: "mike@example.com",
  },
];

const configForTable = {
  AttributeDefinitions: [{ AttributeName: "id", AttributeType: "S" }],
  KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5,
  },
};

export const dealTableParams = {
  TableName: dealTableName,
  ...configForTable,
};
export const customerTableParams = {
  TableName: customerTableName,
  ...configForTable,
};

export const taskTableParams = {
  TableName: taskTableName,
  ...configForTable,
};
