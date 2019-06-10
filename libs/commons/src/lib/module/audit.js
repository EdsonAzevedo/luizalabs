"use strict";

const ValidationContract = require("./validator"),
    Constants = require("../constants");

class Audit {

    static get AUDIT_OPERATIONS () {

        return {

            "CREATE": "CREATE",
            "UPDATE": "UPDATE"

        };

    }

    /**
     * Define o payload de auditoria dos payloads das APIs com base na operação desejada.
     *
     * @param {Object} jsonData objeto com com o payload original a ser persistido/atualizado
     * @param {string} identity.user ID do usuario propagado pela camada de segurança da API
     * @param {Object} operation Operação que será realizada no banco de dados. Exemplo: CREATE / UPDATE
     */
    setAuditData (jsonData, identity, operation) {

        const contract = new ValidationContract();

        // Valida parametros recebidos na chamada
        contract.isRequired(jsonData, Constants.ERROR_MESSAGE.PARAMETER_REQUIRED.replace("|NAME|", "jsonData"));
        contract.isRequired(identity, Constants.ERROR_MESSAGE.PARAMETER_REQUIRED.replace("|NAME|", "identity"));
        if (identity) {

            contract.isRequired(identity.user, Constants.ERROR_MESSAGE.PARAMETER_REQUIRED.replace("|NAME|", "identity.user"));

        }
        contract.isRequired(operation, Constants.ERROR_MESSAGE.PARAMETER_REQUIRED.replace("|NAME|", "operation"));

        if (!contract.isValid()) {

            const errorBadParams = {
                "errors": contract.getErrors().errors
            };

            throw errorBadParams;

        }


        switch (operation) {

        case "UPDATE":
            jsonData.updatedBy = identity.user;
            jsonData.updatedAt = new Date().toISOString();

            break;
        case "CREATE":
            jsonData.createdBy = identity.user;
            jsonData.createdAt = new Date().toISOString();

            break;
        default:
            break;

        }

        return jsonData;

    }


}

module.exports = Audit;
