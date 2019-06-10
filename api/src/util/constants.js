"use strict";

module.exports = {
    "API_INFO": {
        "CONTENT_TYPE_APPLICATION_JSON": "application/json",
        "UUID_VERSION": 4
    },
    "ERROR_CODE": {
        "DYNAMO_VALIDATION_EXCEPTION": "ValidationException"
    },
    "ERROR_MESSAGE": {
        "ID_NOT_VALID": "O identificador não é válido",
        "PARAMETER_REQUIRED": "O parâmetro '|NAME|' é obrigatório",
        "HEADER_PARAMETER_REQUIRED": "O parâmetro '|NAME|' do cabeçalho da requisição é obrigatório",
        "REQUEST_VALIDATION_ERROR": "Erro na validação da sua requisição",
        "RESOURCE_NOT_FOUND": "O recurso solicitado não existe",
        "RESOURCE_NOT_FOUND_INTERNAL": "A consulta não retornou nenhum resultado",
        "RESOURCE_NOT_FOUND_CODE": 20,
        "VALIDATION_ERROR_REQUEST_PAYLOAD": "Erro de validação do payload de entrada",
        "VALIDATION_ERROR_REQUEST_PAYLOAD_CODE": 10,
        "VALIDATION_ERROR_REQUEST_PAYLOAD_KEY_CANNOT_BE_CHANGED": "O valor fornecido no atributo de chave não pode ser alterada",
        "VALIDATION_ERROR_REQUEST_PAYLOAD_KEY_CANNOT_BE_CHANGED_CODE": 11,
        "JSON_PARSE_ERROR": "Ocorreu um erro ao tentar realizar o parse do payload de entrada. Favor corrigir e submeter novamente a sua requisição.",
        "JSON_PARSE_ERROR_CODE": 30,
        "INTERNAL_ERROR_MESSAGE": "Ocorreu um erro interno na sua requisição",
        "INTERNAL_ERROR_MESSAGE_DETAIL": "Contactar o administrador e solicitar o log pelo requestId '|REQUEST_ID|'",
        "INTERNAL_ERROR_CODE": 90
    },
    "HTTP_CODE": {
        "OK": 200,
        "CREATED": 201,
        "ACCEPTED": 202,
        "NO_CONTENT": 204,
        "BAD_REQUEST": 400,
        "UNAUTHORIZED": 401,
        "FORBIDDEN": 403,
        "NOT_FOUND": 404,
        "INTERNAL_SERVER_ERROR": 500
    }
};
