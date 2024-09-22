const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand } = require('@aws-sdk/lib-dynamodb');

const dynamoDbClient = new DynamoDBClient({});
const dynamoDb = DynamoDBDocumentClient.from(dynamoDbClient);
const tableName = process.env.TABLE_NAME;

exports.handler = async (event) => {
  console.log("event: ", event);
  const { productId, name, price } = JSON.parse(event.body);
  const params = {
    TableName: tableName,
    Item: { productId, name, price }
  };

  try {
    await dynamoDb.send(new PutCommand(params));
    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'Product added successfully' })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not add product', details: error.message })
    };
  }
};
