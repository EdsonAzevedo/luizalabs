"use strict";

const Constants = require("../util/constants"),
    Commons = require("commons"),
    Repository = require("../repositories/api-repository");


/**
 * @api {get} /private/v1/api/employee Recurso que retorna uma lista de funcionários
 * @apiVersion 1.0.0
 * @apiGroup api
 * @apidescription Serviço que retorna uma lista de funcionários.
 *
 * @apiHeader {String} Authorization Token de autorização
 *
 * @apiSuccess              {String}                    [id] Identificador do funcionário.
 * @apiSuccess              {String}                    [name] Nome do funcionário.
 * @apiSuccess              {String}                    [email] Email do funcionário.
 * @apiSuccess              {String}                    [department] Nome do departamento do funcionário
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *        [
 *             {
 *                  "id": "ced758a3-3a01-474e-9136-06aa50e53076",
 *                  "name": "Arnaldo Pereira",
 *                  "email": "arnaldo@luizalabs.com",
 *                  "department": "Architecture"
 *             }
 *        ]
 *
 * @apiError NotFound A consulta não retornou nenhum resultado
 *
 * @apiErrorExample Error-Response: 404
 *     HTTP/1.1 404 Not Found
 *     {
 *       "requestId": "aee768a3-3a01-474e-9236-02aa50e53040",
 *       "data": [
 *          {
 *              "code": 20,
 *              "userMessage": "O recurso solicitado não existe",
 *              "internalMessage": "A consulta não retornou nenhum resultado"
 *          }
 *       ]
 *     }
 *
 * @apiError BadRequest Erro na validação da sua requisição
 *
 * @apiErrorExample Error-Response: 400
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "requestId": "aee768a3-3a01-474e-9236-02aa50e53040",
 *       "data": [
 *          {
 *              "code": 10,
 *              "userMessage": "Erro na validação da sua requisição",
 *              "internalMessage": "O identificador não é válido"
 *          }
 *       ]
 *     }
 *
 * @apiError InternalServerError Ocorreu um erro interno na consulta
 *
 * @apiErrorExample Error-Response: 500
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "requestId": "aee768a3-3a01-474e-9236-02aa50e53040",
 *       "data": [
 *          {
 *              "code": 90,
 *              "userMessage": "Ocorreu um erro interno na consulta",
 *              "internalMessage": "Contactar o administrador e solicitar o log pelo requestId 'aee768a3-3a01-474e-9236-02aa50e53040'"
 *          }
 *       ]
 *     }
 *
 *
 */
exports.get = async (limit, lastEvaluatedKey, attributesToRetrieve) => {

    try {

        const contract = new Commons.ValidationContract();

        contract.isRequired(limit, Constants.ERROR_MESSAGE.HEADER_PARAMETER_REQUIRED.replace("|NAME|", "limit"));

        if (!contract.isValid()) {

            const errorBadRequest = {
                "errors": contract.getErrors().errors,
                "statusCode": Constants.HTTP_CODE.BAD_REQUEST
            };

            throw errorBadRequest;

        }

        const repositoryResponse = await Repository.get(limit, lastEvaluatedKey, attributesToRetrieve);

        if (repositoryResponse.statusCode === Constants.HTTP_CODE.NOT_FOUND) {

            const errorModel = new Commons.ErrorModel(Constants.ERROR_MESSAGE.RESOURCE_NOT_FOUND, Constants.ERROR_MESSAGE.RESOURCE_NOT_FOUND_INTERNAL, Constants.ERROR_MESSAGE.RESOURCE_NOT_FOUND_CODE).getModel();

            const errorNotFound = {
                "errors": [errorModel],
                "statusCode": Constants.HTTP_CODE.NOT_FOUND
            };

            throw errorNotFound;

        }

        return repositoryResponse;

    } catch (error) {

        console.error(error);
        throw error;

    }

};

/**
 * @api {get} /private/v1/api/employee/{id} Recurso que consulta em banco de dados as informações referente a um funcionário.
 * @apiVersion 1.0.0
 * @apiGroup api
 * @apidescription Serviço que consulta em banco de dados as informações referente a um funcionário.
 *
 * @apiHeader {String} Authorization Token de autorização
 *
 * @apiParam {String} id do funcionário
 *
 * @apiSuccess              {String}                    [id] Identificador do funcionário.
 * @apiSuccess              {String}                    [name] Nome do funcionário.
 * @apiSuccess              {String}                    [email] Email do funcionário.
 * @apiSuccess              {String}                    [department] Nome do departamento do funcionário
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *        {
 *            "id": "ced758a3-3a01-474e-9136-06aa50e53076",
 *            "name": "Arnaldo Pereira",
 *            "email": "arnaldo@luizalabs.com",
 *            "department": "Architecture"
 *        }
 *
 * @apiError NotFound A consulta não retornou nenhum resultado
 *
 * @apiErrorExample Error-Response: 404
 *     HTTP/1.1 404 Not Found
 *     {
 *       "requestId": "aee768a3-3a01-474e-9236-02aa50e53040",
 *       "data": [
 *          {
 *              "code": 20,
 *              "userMessage": "O recurso solicitado não existe",
 *              "internalMessage": "A consulta não retornou nenhum resultado"
 *          }
 *       ]
 *     }
 *
 * @apiError BadRequest Erro na validação da sua requisição
 *
 * @apiErrorExample Error-Response: 400
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "requestId": "aee768a3-3a01-474e-9236-02aa50e53040",
 *       "data": [
 *          {
 *              "code": 10,
 *              "userMessage": "Erro na validação da sua requisição",
 *              "internalMessage": "O identificador não é válido"
 *          }
 *       ]
 *     }
 *
 * @apiError InternalServerError Ocorreu um erro interno na consulta
 *
 * @apiErrorExample Error-Response: 500
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "requestId": "aee768a3-3a01-474e-9236-02aa50e53040",
 *       "data": [
 *          {
 *              "code": 90,
 *              "userMessage": "Ocorreu um erro interno na consulta",
 *              "internalMessage": "Contactar o administrador e solicitar o log pelo requestId 'aee768a3-3a01-474e-9236-02aa50e53040'"
 *          }
 *       ]
 *     }
 *
 *
 */
exports.getById = async (id, attributesToRetrieve) => {

    try {

        const contract = new Commons.ValidationContract();

        contract.isUUID(id, Constants.API_INFO.UUID_VERSION, Constants.ERROR_MESSAGE.ID_NOT_VALID);
        contract.isRequired(id, Constants.ERROR_MESSAGE.PARAMETER_REQUIRED.replace("|NAME|", "id"));

        if (!contract.isValid()) {

            const errorBadRequest = {
                "errors": contract.getErrors().errors,
                "statusCode": Constants.HTTP_CODE.BAD_REQUEST
            };

            throw errorBadRequest;

        }

        const repositoryResponse = await Repository.getById(id, attributesToRetrieve);

        if (repositoryResponse.statusCode === Constants.HTTP_CODE.NOT_FOUND) {

            const errorModel = new Commons.ErrorModel(Constants.ERROR_MESSAGE.RESOURCE_NOT_FOUND, Constants.ERROR_MESSAGE.RESOURCE_NOT_FOUND_INTERNAL, Constants.ERROR_MESSAGE.RESOURCE_NOT_FOUND_CODE).getModel();

            const errorNotFound = {
                "errors": [errorModel],
                "statusCode": Constants.HTTP_CODE.NOT_FOUND
            };

            throw errorNotFound;

        }

        return repositoryResponse;

    } catch (error) {

        console.error(error);
        throw error;

    }

};

/**
 * @api {post} /private/v1/api/employee Recurso que persiste em banco de dados as informações referente a um funcionário.
 * @apiVersion 1.0.0
 * @apiGroup api
 * @apidescription Serviço que persiste em banco de dados as informações referente a um funcionário.
 *
 * @apiHeader {String} Authorization Token de autorização
 *
 * @apiSuccess              {String}                    [name] Nome do funcionário.
 * @apiSuccess              {String}                    [email] Email do funcionário.
 * @apiSuccess              {String}                    [department] Nome do departamento do funcionário
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 201 Created
 *        {
 *            "id": "ced758a3-3a01-474e-9136-06aa50e53076",
 *            "name": "Arnaldo Pereira",
 *            "email": "arnaldo@luizalabs.com",
 *            "department": "Architecture"
 *        }
 *
 * @apiError NotFound A consulta não retornou nenhum resultado
 *
 * @apiErrorExample Error-Response: 404
 *     HTTP/1.1 404 Not Found
 *     {
 *       "requestId": "aee768a3-3a01-474e-9236-02aa50e53040",
 *       "data": [
 *          {
 *              "code": 20,
 *              "userMessage": "O recurso solicitado não existe",
 *              "internalMessage": "A consulta não retornou nenhum resultado"
 *          }
 *       ]
 *     }
 *
 * @apiError BadRequest Erro na validação da sua requisição
 *
 * @apiErrorExample Error-Response: 400
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "requestId": "aee768a3-3a01-474e-9236-02aa50e53040",
 *       "data": [
 *          {
 *              "code": 10,
 *              "userMessage": "Erro na validação da sua requisição",
 *              "internalMessage": "O identificador não é válido"
 *          }
 *       ]
 *     }
 *
 * @apiError InternalServerError Ocorreu um erro interno na consulta
 *
 * @apiErrorExample Error-Response: 500
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "requestId": "aee768a3-3a01-474e-9236-02aa50e53040",
 *       "data": [
 *          {
 *              "code": 90,
 *              "userMessage": "Ocorreu um erro interno na consulta",
 *              "internalMessage": "Contactar o administrador e solicitar o log pelo requestId 'aee768a3-3a01-474e-9236-02aa50e53040'"
 *          }
 *       ]
 *     }
 *
 *
 */
exports.create = async (body) => {

    try {

        const contract = new Commons.ValidationContract();

        contract.isRequired(body.name, Constants.ERROR_MESSAGE.PARAMETER_REQUIRED.replace("|NAME|", "name"));
        contract.isRequired(body.email, Constants.ERROR_MESSAGE.PARAMETER_REQUIRED.replace("|NAME|", "email"));
        contract.isRequired(body.department, Constants.ERROR_MESSAGE.PARAMETER_REQUIRED.replace("|NAME|", "department"));

        if (!contract.isValid()) {

            const errorBadRequest = {
                "errors": contract.getErrors().errors,
                "statusCode": Constants.HTTP_CODE.BAD_REQUEST
            };

            throw errorBadRequest;

        }

        const repositoryResponse = await Repository.create(body);

        return repositoryResponse;

    } catch (error) {

        console.error(error);
        throw error;

    }

};

/**
 * @api {delete} /private/v1/api/employee/{id} Recurso que remove do banco de dados o registro de um funcionário.
 * @apiVersion 1.0.0
 * @apiGroup api
 * @apidescription Serviço que remove do banco de dados o registro referente a um funcionário.
 *
 * @apiHeader {String} Authorization Token de autorização
 *
 * @apiParam {String} id do funcionário
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 204 No Content
 *
 */
exports.delete = async (id) => {

    try {

        const contract = new Commons.ValidationContract();

        contract.isUUID(id, Constants.API_INFO.UUID_VERSION, Constants.ERROR_MESSAGE.ID_NOT_VALID);
        contract.isRequired(id, Constants.ERROR_MESSAGE.PARAMETER_REQUIRED.replace("|NAME|", "id"));

        if (!contract.isValid()) {

            const errorBadRequest = {
                "errors": contract.getErrors().errors,
                "statusCode": Constants.HTTP_CODE.BAD_REQUEST
            };

            throw errorBadRequest;

        }

        const repositoryResponse = await Repository.delete(id);

        return repositoryResponse;

    } catch (error) {

        console.error(error);
        throw error;

    }

};

