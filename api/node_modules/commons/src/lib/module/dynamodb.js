"use strict";

const AWS = require("aws-sdk"),
    _ = require("lodash"); // eslint-disable-line import/no-extraneous-dependencies

class DynamoDB {

    getDocumentClient () {

        let options = {};

        // Connect to local DB if running offline
        if (process.env.IS_OFFLINE) {

            options = {
                "region": "localhost",
                "endpoint": "http://localhost:8000"
            };

        }

        return new AWS.DynamoDB.DocumentClient(options);

    }

    setAttributesToRetrieve (params, attributesToRetrieve) {

        let projectionExpression = "";
        const expressionAttributeNames = {};

        if (attributesToRetrieve) {

            const attributes = _.split(attributesToRetrieve, ",");

            attributes.forEach((element) => {

                const trimmedElement = _.trim(element);

                projectionExpression += `#${trimmedElement},`;
                _.assign(expressionAttributeNames, {[`#${trimmedElement},`.slice(0, -1)]: trimmedElement});

            });

            projectionExpression = projectionExpression.slice(0, -1);

            params.ProjectionExpression = projectionExpression;
            params.ExpressionAttributeNames = expressionAttributeNames;

        }

    }

}

module.exports = DynamoDB;
