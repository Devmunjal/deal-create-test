import {
  customers,
  customerTableParams,
  dealTableParams,
  taskTableParams,
} from "./constants";

const AWS = require("aws-sdk");

// Configure the AWS SDK to connect to DynamoDB Local
AWS.config.update({
  region: "us-west-2", // You can use any region
  endpoint: "http://localhost:8000", // DynamoDB Local endpoint
});

AWS.config.credentials = new AWS.Credentials(
  "accessKeyId",
  "secretAccessKey",
  null
);

// Create DynamoDB service object
export const dynamoDB = new AWS.DynamoDB.DocumentClient();

const dynamoDBLocal = new AWS.DynamoDB();

// Example: List Tables
dynamoDBLocal.listTables({}, (err: any, data: any) => {
  if (err) {
    console.error(
      "Unable to list tables. Error JSON:",
      JSON.stringify(err, null, 2)
    );
  } else {
    console.log("Table names are:", data.TableNames);
    if (data.TableNames.length === 0) {
      // Create tables for deal, customer, and task

      dynamoDBLocal.createTable(dealTableParams, (err: any, data: any) => {
        if (err) {
          console.error(
            "Unable to create table. Error JSON:",
            JSON.stringify(err, null, 2)
          );
        } else {
        }
      });

      dynamoDBLocal.createTable(customerTableParams, (err: any, data: any) => {
        if (err) {
          console.error(
            "Unable to create table. Error JSON:",
            JSON.stringify(err, null, 2)
          );
        } else {
          customers.forEach((customer) => {
            dynamoDB.put(
              {
                TableName: "Customers",
                Item: customer,
              },
              (err: any, data: any) => {
                if (err) {
                  console.error(
                    "Unable to add item. Error JSON:",
                    JSON.stringify(err, null, 2)
                  );
                } else {
                  console.log("Added item:", JSON.stringify(data, null, 2));
                }
              }
            );
          });
        }
      });

      dynamoDBLocal.createTable(taskTableParams, (err: any, data: any) => {
        if (err) {
          console.error(
            "Unable to create table. Error JSON:",
            JSON.stringify(err, null, 2)
          );
        } else {
        }
      });
    }
  }
});
