'use strict';
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
const uuid = require('uuid');

module.exports.handler = (event, context, callback) => {

    const json = JSON.parse(event.body);

    var params = {
        Item: {
            "bottleId": {
                S: uuid.v1()
            },
            "lat": {
                N: '' + json.position.lat
            },
            "lng": {
                N: '' + json.position.lng
            },
            "title": {
                S: json.title
            },
            "body": {
                S: json.body
            },
            "author": {
                S: json.author
            },
        },
        TableName: process.env.BOTTLE_DYNAMODB_TABLE
    };

    dynamodb.putItem(params, (err, data) => {
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
