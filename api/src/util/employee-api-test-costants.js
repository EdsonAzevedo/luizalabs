"use strict";

module.exports = {
    "REQUEST_EMPLOYEE_OK": {
        "name": "Edson Azevedo",
        "email": "edson.b.azevedo@gmail.com",
        "department": "Architecture"
    },
    "REQUEST_HEADER_LIMIT": {
        "headers": {
            "limit": 10
        }
    },
    "RESPONSE_ERROR_PAYLOAD": [
        {
            "code": 10,
            "userMessage": "O parâmetro 'name' é obrigatório",
            "internalMessage": "Erro de validação do payload de entrada"
        },
        {
            "code": 10,
            "userMessage": "O parâmetro 'email' é obrigatório",
            "internalMessage": "Erro de validação do payload de entrada"
        },
        {
            "code": 10,
            "userMessage": "O parâmetro 'department' é obrigatório",
            "internalMessage": "Erro de validação do payload de entrada"
        }
    ],
    "RESPONSE_ERROR_NOTFOUND": {
        "code": 20,
        "internalMessage": "A consulta não retornou nenhum resultado",
        "userMessage": "O recurso solicitado não existe"
    }
};
