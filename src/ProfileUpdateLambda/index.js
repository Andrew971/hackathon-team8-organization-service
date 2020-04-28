const AWS = require('aws-sdk')
console.log('Loading function')

const dynamodb = new AWS.DynamoDB.DocumentClient({
  region: 'us-east-1'
})

exports.handler = async (event, context, callback) => {

  try {
    console.log('event handler', event)
    const body = JSON.parse(event.body)
    const {
      id = null,
      entries = []
    } = body
    console.log('event body', body)
    if (id === null || entries.length < 1) {
      callback(null, {
        headers: {
          "Access-Control-Allow-Origin": "*", // Required for CORS support to work
          "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS 
        },
        statusCode: 404,
        body: JSON.stringify({
          message: "Please Provide an Id or Awarded User Id"
        })
      })
      return
    }
    const timestamp = Math.floor(Date.now() / 1000)
    console.log('request timestamp', timestamp)
    const {
      firstName,
      lastName,
      address,
      city,
      zipCode,
      state,
      country,
    } = Object.fromEntries(entries)
    const updateProfile = {
      TableName: process.env.DYNAMODB_TABLE,
      Key: {
        "UserId": id,
        "Type": 'Profile'
      },
      ExpressionAttributeNames: {
        "#First_Name": "First_Name",
        "#Last_Name": "Last_Name",
        "#Location": "Location",
        "#Updated_At": "Updated_At"
      },
      ExpressionAttributeValues: {
        ":Location": {
          streetName: address,
          city: city,
          zipCode: zipCode,
          state: state,
          country: country,
        },
        ":First_Name": firstName,
        ":Last_Name": lastName,
        ":Updated_At": timestamp
      },
      ReturnValues: "ALL_NEW",
      UpdateExpression: "SET #First_Name = :First_Name, #Last_Name = :Last_Name, #Location = :Location, #Updated_At = :Updated_At"
    }
    console.log('request data', updateProfile)

    const putJobRequest = await dynamodb.update(updateProfile).promise()

    callback(null, {
      headers: {
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS 
      },
      statusCode: 200,
      body: JSON.stringify(putJobRequest)

    })
    return
  } catch (e) {
    console.log(e)
    callback(null, {
      headers: {
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS 
      },
      statusCode: 404,
      body: JSON.stringify({
        message: "Something went wrong",
        error: e

      })
    })
  }

}