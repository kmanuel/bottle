'use strict';
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

module.exports.handler = (event, context, callback) => {

    var params = {
        TableName: process.env.BOTTLE_DYNAMODB_TABLE,
        ExpressionAttributeNames: {
            "#CB": "collectedBy"
        },
        ExpressionAttributeValues: {
            ":cb": {
                S: event.pathParameters.username
            }
        },
        Key: {
            "bottleId": {
                S: event.pathParameters.bottleId
            }
        },
        UpdateExpression: 'SET #CB = :cb'
    };

    dynamodb.updateItem(params, (err, data) => {
        if (err) return callback(JSON.stringify(err));
        else return callback(null, {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({data})
        });
    });
};
