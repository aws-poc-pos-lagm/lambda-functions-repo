const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, ScanCommand } = require('@aws-sdk/lib-dynamodb');

const dynamoDbClient = new DynamoDBClient({});
const dynamoDb = DynamoDBDocumentClient.from(dynamoDbClient);
const tableName = process.env.TABLE_NAME;

exports.handler = async () => {
  const params = {
    TableName: tableName
  };

  try {
    const { Items } = await dynamoDb.send(new ScanCommand(params));
    return {
      statusCode: 200,
      body: JSON.stringify(Items)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not retrieve products', details: error.message })
    };
  }
};
