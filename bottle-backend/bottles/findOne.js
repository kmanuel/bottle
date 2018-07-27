'use strict';
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

module.exports.handler = (event, context, callback) => {

    var params = {
        TableName: process.env.BOTTLE_DYNAMODB_TABLE,
        Key: {
            "bottleId": {
                "S": event.pathParameters.id
            }
        }
    };

    dynamodb.getItem(params, (err, data) => {
        if (err) {
            console.log('error', err);
            const ret = {
                err,
                event
            };
            return callback(JSON.stringify(ret));
        }
        else {
            console.log('success', data);
            return callback(null, {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({
                    data
                })
            });
        }
    });
};
