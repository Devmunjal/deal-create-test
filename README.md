## Getting Started

You can start the server in two ways:

## Using Docker Compose

```bash
docker compose up
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

[API routes] can be accessed on [http://localhost:4000/graphql](http://localhost:4000/graphql).

## Using NPM

```
cd create-deal && yarn && cd ../create-deal-backend && yarn
```

- ### Start DynamoDB Local

```
cd dynamodb_local_latest && java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -inMemory -sharedDb
```

- ### Start Node Server

```
cd create-deal-backend && yarn start
```

- ### Start next app

```
cd create-deal && yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

[API routes] can be accessed on [http://localhost:4000/graphql](http://localhost:4000/graphql).

## DASHBOARD


https://github.com/user-attachments/assets/968f0d96-902a-42a8-8f0a-9e8170d76703


![image](https://github.com/user-attachments/assets/e52b40af-437b-4f77-85eb-a638908ce557)

