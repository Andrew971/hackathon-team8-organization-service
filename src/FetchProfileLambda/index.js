const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });


exports.handler = async (event, context, callback) => {

  console.log("\n\nLoading handler\n\n", event);
  try {
    const {
      id
    } = event.queryStringParameters
    const query = {
      TableName: process.env.DYNAMODB_TABLE,
      KeyConditionExpression: "#UserId = :id AND #Type = :Type",
      ExpressionAttributeNames: {
        '#UserId': 'UserId',
        '#Type': 'Type',
      },
      ExpressionAttributeValues: {
        ":id": id,
        ":Type": 'Profile'
      }
    }

    const queryResult = await dynamodb.query(query).promise()
    console.log(queryResult)
    return {
      headers: {
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS 
      },
      statusCode: 200,
      body: JSON.stringify(queryResult)
    }
  } catch (e) {
    return {
      headers: {
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS 
      },
      statusCode: 404,
      body: JSON.stringify(e)
    }

  }
};