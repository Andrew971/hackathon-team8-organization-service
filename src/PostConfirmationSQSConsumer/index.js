const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });


exports.handler = async (event, context, callback) => {
  try {
    for (record of event.Records) {
      console.log('record', record)
      const body = JSON.parse(record.body)
      const Message = JSON.parse(body.Message)
      console.log('Message', Message)
      const {
        userName,
        userPoolId,
        region,
        request,
      } = Message

      const {
        userAttributes = null,
      } = request

      const timestamp = Math.floor(Date.now() / 1000)
      console.log('request timestamp', timestamp)


      const updateProfile = {
        TableName: process.env.DYNAMODB_TABLE,
        Item: {
          UserId: userAttributes.sub,
          Type: 'Profile',
          Email: userAttributes.email,
          Extra_Field: {
            userName,
            userPoolId,
            region
          },
          Created_At: timestamp,
          Updated_At: timestamp,
        }
      }
      console.log('request data', updateProfile)

      const putJobRequest = await dynamodb.put(updateProfile).promise()

      return `Successfully processed ${event.Records.length} records.`
    }
  } catch (error) {
    console.log({
      message: 'A problem ocurred',
      event: JSON.stringify(event)
    })
    throw error
  }

  callback(null, { statusCode: 200, body: 'Data sent.' });


};