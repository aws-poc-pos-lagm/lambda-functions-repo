const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, DeleteCommand } = require('@aws-sdk/lib-dynamodb');

const dynamoDbClient = new DynamoDBClient({});
const dynamoDb = DynamoDBDocumentClient.from(dynamoDbClient);
const tableName = process.env.TABLE_NAME;

exports.handler = async (event) => {
  console.log("event: ", event);
  const { productId } = JSON.parse(event.body);
  const params = {
    TableName: tableName,
    Key: { productId }
  };

  try {
    await dynamoDb.send(new DeleteCommand(params));
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Product deleted successfully' })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not delete product', details: error.message })
    };
  }
};
