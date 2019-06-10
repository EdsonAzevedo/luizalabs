"use strict";

const Controller = require("../controller/api-controller");
const Commons = require("commons");
const Constants = require("../util/constants");

const generateParameters = function generateParameters (event) {

    let {httpMethod, body, id} = "";
    const errors = [];

    try {

        httpMethod = event.httpMethod || event.field;
        body = event.body && JSON.parse(event.body) || event.arguments && event.arguments.input;
        id = (event.pathParameters || body || {}).id;

    } catch (error) {

        console.error(error);

        const errorBadRequest = {};

        errors.push(new Commons.ErrorModel(Constants.ERROR_MESSAGE.REQUEST_VALIDATION_ERROR, Constants.ERROR_MESSAGE.JSON_PARSE_ERROR, Constants.ERROR_MESSAGE.JSON_PARSE_ERROR_CODE).getModel());

        errorBadRequest.statusCode = Constants.HTTP_CODE.BAD_REQUEST;
        errorBadRequest.errors = errors;

        throw errorBadRequest;

    }

    return {
        httpMethod,
        body,
        id
    };

};

exports.handler = async (event, context) => {

    try {

        const {httpMethod, body, id} = generateParameters(event);

        let response = {};

        switch (httpMethod) {

        case "GET":

            if (id) {

                response = await Controller.getById(id, event.headers["payload-attributes"]);

                return new Commons.LambdaModel(context.awsRequestId, response.statusCode, response.result).getModel();

            }

            response = await Controller.get(event.headers.limit, event.headers["pagination-token"], event.headers["payload-attributes"]);

            return new Commons.LambdaModel(context.awsRequestId, response.statusCode, response.result, response.headers).getModel();

        case "POST":
            new Commons.Audit().setAuditData(body, event.requestContext.identity, Commons.Audit.AUDIT_OPERATIONS.CREATE);

            response = await Controller.create(body);

            return new Commons.LambdaModel(context.awsRequestId, response.statusCode, response.result).getModel();

        case "DELETE":
            response = await Controller.delete(id);

            return new Commons.LambdaModel(context.awsRequestId, response.statusCode, response.result).getModel();

        default:
            // Send HTTP 501: Not Implemented
            console.log(`Erro: Método (${event.httpMethod}) não suportado!`);

            return {"statusCode": 501};

        }

    } catch (error) {

        console.error(error);

        return new Commons.LambdaModel(context.awsRequestId, error.statusCode, error.errors).getModel();

    }

};
