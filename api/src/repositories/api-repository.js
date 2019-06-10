"use strict";

const Constants = require("../util/constants"),
    Model = require("../model/api-model"),
    Commons = require("commons"),
    _ = require("lodash"),
    uuidv4 = require("uuid/v4");


exports.get = async (limit, lastEvaluatedKey, attributesToRetrieve) => {

    const response = {
            "result": [],
            "statusCode": Constants.HTTP_CODE.OK,
            "headers": {}
        },
        errors = [];

    try {

        const params = {
            "TableName": process.env.DYNAMODB_TABLE,
            "Limit": limit
        };

        if (lastEvaluatedKey) {

            const buff = Buffer.from(lastEvaluatedKey, "base64");

            params.ExclusiveStartKey = JSON.parse(buff.toString("ascii"));

        }

        const dynamo = new Commons.DynamoDB();
        const docClient = dynamo.getDocumentClient();

        dynamo.setAttributesToRetrieve(params, attributesToRetrieve);

        const scanResponse = await docClient.scan(params).promise();

        const rs = scanResponse.Items;

        if (rs && rs.length > 0) {

            rs.forEach((item) => {

                const apiModel = new Model(item.id, item.name, item.email, item.department);

                response.result.push(apiModel.getModel());

            });

        }

        response.headers.ExclusiveStartKey = scanResponse.LastEvaluatedKey;

        if (_.isEmpty(response.result)) {

            const error = {};

            errors.push(new Commons.ErrorModel(
                Constants.ERROR_MESSAGE.RESOURCE_NOT_FOUND
                , Constants.ERROR_MESSAGE.RESOURCE_NOT_FOUND_INTERNAL
                , Constants.ERROR_MESSAGE.RESOURCE_NOT_FOUND_CODE
            ).getModel());

            error.statusCode = Constants.HTTP_CODE.NOT_FOUND;
            error.errors = errors;

            console.error(error);
            throw error;

        }

    } catch (error) {

        /*
         * Se nenhum erro foi tratado entre as chamadas, significa que um erro interno ocorreu
         * Este erro deverá ser tratado para repassar para as outras camadas
         */
        if (errors.length === 0) {

            console.error(error);

            errors.push(new Commons.ErrorModel(
                Constants.ERROR_MESSAGE.INTERNAL_ERROR_MESSAGE
                , Constants.ERROR_MESSAGE.INTERNAL_ERROR_MESSAGE_DETAIL.replace("|REQUEST_ID|", error.requestId)
                , Constants.ERROR_MESSAGE.INTERNAL_ERROR_CODE
            ).getModel());

            error.statusCode = Constants.HTTP_CODE.INTERNAL_SERVER_ERROR;
            error.errors = errors;

        }

        console.error(error);
        throw error;

    }

    return response;

};

exports.getById = async (id, attributesToRetrieve) => {

    const response = {
            "result": {},
            "statusCode": Constants.HTTP_CODE.OK
        },
        errors = [];

    try {

        const params = {
            "TableName": process.env.DYNAMODB_TABLE,
            "Key": {
                id
            }
        };

        const dynamo = new Commons.DynamoDB();
        const docClient = dynamo.getDocumentClient();

        dynamo.setAttributesToRetrieve(params, attributesToRetrieve);

        const getResponse = await docClient.get(params).promise();

        const item = getResponse.Item;

        if (item) {

            const apiModel = new Model(item.id, item.name, item.email, item.department);

            response.result = apiModel.getModel();

        }

        if (_.isEmpty(response.result)) {

            const error = {};

            errors.push(new Commons.ErrorModel(
                Constants.ERROR_MESSAGE.RESOURCE_NOT_FOUND
                , Constants.ERROR_MESSAGE.RESOURCE_NOT_FOUND_INTERNAL
                , Constants.ERROR_MESSAGE.RESOURCE_NOT_FOUND_CODE
            ).getModel());

            error.statusCode = Constants.HTTP_CODE.NOT_FOUND;
            error.errors = errors;

            console.error(error);
            throw error;

        }

    } catch (error) {

        /*
         * Se nenhum erro foi tratado entre as chamadas, significa que um erro interno ocorreu
         * Este erro deverá ser tratado para repassar para as outras camadas
         */
        if (errors.length === 0) {

            console.error(error);

            errors.push(new Commons.ErrorModel(
                Constants.ERROR_MESSAGE.INTERNAL_ERROR_MESSAGE
                , Constants.ERROR_MESSAGE.INTERNAL_ERROR_MESSAGE_DETAIL.replace("|REQUEST_ID|", error.requestId)
                , Constants.ERROR_MESSAGE.INTERNAL_ERROR_CODE
            ).getModel());

            error.statusCode = Constants.HTTP_CODE.INTERNAL_SERVER_ERROR;
            error.errors = errors;

        }

        console.error(error);
        throw error;

    }

    return response;

};

exports.create = async (body) => {

    const response = {
            "result": {},
            "statusCode": Constants.HTTP_CODE.CREATED
        },
        errors = [];

    try {

        body.id = uuidv4();

        const params = {
            "TableName": process.env.DYNAMODB_TABLE,
            "Item": body
        };

        const docClient = new Commons.DynamoDB().getDocumentClient();

        const putResponse = await docClient.put(params).promise();

        if (putResponse.$response && !putResponse.$response.error) {

            const item = params.Item;

            const apiModel = new Model(item.id, item.name, item.email, item.department);

            response.result = apiModel.getModel();

        }

    } catch (error) {

        /*
         * Se nenhum erro foi tratado entre as chamadas, significa que um erro interno ocorreu
         * Este erro deverá ser tratado para repassar para as outras camadas
         */
        if (errors.length === 0) {

            console.error(error);

            errors.push(new Commons.ErrorModel(
                Constants.ERROR_MESSAGE.INTERNAL_ERROR_MESSAGE
                , Constants.ERROR_MESSAGE.INTERNAL_ERROR_MESSAGE_DETAIL.replace("|REQUEST_ID|", error.requestId)
                , Constants.ERROR_MESSAGE.INTERNAL_ERROR_CODE
            ).getModel());

            error.statusCode = Constants.HTTP_CODE.INTERNAL_SERVER_ERROR;
            error.errors = errors;

        }

        throw error;

    }

    return response;

};

exports.delete = async (id) => {

    const response = {
            "result": {},
            "statusCode": Constants.HTTP_CODE.NO_CONTENT
        },
        errors = [];

    try {

        const params = {
            "TableName": process.env.DYNAMODB_TABLE,
            "Key": {
                id
            }
        };

        const docClient = new Commons.DynamoDB().getDocumentClient();

        await docClient.delete(params).promise();

    } catch (error) {

        /*
         * Se nenhum erro foi tratado entre as chamadas, significa que um erro interno ocorreu
         * Este erro deverá ser tratado para repassar para as outras camadas
         */
        if (errors.length === 0) {

            console.error(error);

            errors.push(new Commons.ErrorModel(
                Constants.ERROR_MESSAGE.INTERNAL_ERROR_MESSAGE
                , Constants.ERROR_MESSAGE.INTERNAL_ERROR_MESSAGE_DETAIL.replace("|REQUEST_ID|", error.requestId)
                , Constants.ERROR_MESSAGE.INTERNAL_ERROR_CODE
            ).getModel());

            error.statusCode = Constants.HTTP_CODE.INTERNAL_SERVER_ERROR;
            error.errors = errors;

        }

        throw error;

    }

    return response;

};

