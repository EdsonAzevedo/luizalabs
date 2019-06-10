const Commons = require("../src/index");

describe("validar model de erro", () => {

    test("ao instanciar novo objeto", () => {

        const errorModel = new Commons.ErrorModel("Ocorreu um erro de negócio", "Ocorreu um erro interno na chamada do serviço externo", 10).getModel();

        expect(errorModel).toEqual({
            "code": 10,
            "userMessage": "Ocorreu um erro de negócio",
            "internalMessage": "Ocorreu um erro interno na chamada do serviço externo"
        });

    });

});

describe("validar model do lambda", () => {

    test("ao instanciar um novo model com body de sucesso do tipo Object (non-array)", () => {

        const body = {
            "id": 1,
            "name": "name",
            "description": "description"
        };

        const lambdaModel = new Commons.LambdaModel("requestId", 200, body).getModel();

        expect(lambdaModel).toEqual({
            "statusCode": 200,
            "body": JSON.stringify({
                "requestId": "requestId",
                "id": 1,
                "name": "name",
                "description": "description"
            })
        });

    });

    test("ao instanciar um novo model com body de sucesso do tipo Array com 1 elemento", () => {

        const body =
            [
                {
                    "id": 1,
                    "name": "name",
                    "description": "description"
                }
            ];

        const lambdaModel = new Commons.LambdaModel("requestId", 200, body).getModel();

        expect(lambdaModel).toEqual({
            "statusCode": 200,
            "body": JSON.stringify({
                "requestId": "requestId",
                "data": [
                    {
                        "id": 1,
                        "name": "name",
                        "description": "description"
                    }
                ]
            })
        });

    });

    test("ao instanciar um novo model com body de sucesso do tipo Array com + de 1 elemento", () => {

        const body =
            [
                {
                    "id": 1,
                    "name": "name 1",
                    "description": "description 1"
                },
                {
                    "id": 2,
                    "name": "name 2",
                    "description": "description 2"
                }
            ];

        const lambdaModel = new Commons.LambdaModel("requestId", 200, body).getModel();

        expect(lambdaModel).toEqual({
            "statusCode": 200,
            "body": JSON.stringify({
                "requestId": "requestId",
                "data": [
                    {
                        "id": 1,
                        "name": "name 1",
                        "description": "description 1"
                    },
                    {
                        "id": 2,
                        "name": "name 2",
                        "description": "description 2"
                    }
                ]
            })
        });

    });

    test("ao instanciar um novo model com body de erro do tipo Array com 1 elemento", () => {

        const errorModel = new Commons.ErrorModel("Ocorreu um erro de negócio", "Ocorreu um erro interno na chamada do serviço externo", 10).getModel();

        const body =
            [errorModel];

        const lambdaModel = new Commons.LambdaModel("requestId", 200, body).getModel();

        expect(lambdaModel).toEqual({
            "statusCode": 200,
            "body": JSON.stringify({
                "requestId": "requestId",
                "errors": [
                    {
                        "code": 10,
                        "userMessage": "Ocorreu um erro de negócio",
                        "internalMessage": "Ocorreu um erro interno na chamada do serviço externo"
                    }
                ]
            })
        });


    });

    test("ao instanciar um novo model com body de erro do tipo Array com + de 1 elemento", () => {

        const errorModel1 = new Commons.ErrorModel("Ocorreu um erro de negócio", "Ocorreu um erro interno na chamada do serviço externo", 10).getModel();
        const errorModel2 = new Commons.ErrorModel("Ocorreu um outro erro de negócio", "Ocorreu um outro erro interno na chamada do serviço externo", 20).getModel();

        const body =
            [
                errorModel1,
                errorModel2
            ];

        const lambdaModel = new Commons.LambdaModel("requestId", 200, body).getModel();

        expect(lambdaModel).toEqual({
            "statusCode": 200,
            "body": JSON.stringify({
                "requestId": "requestId",
                "errors": [
                    {
                        "code": 10,
                        "userMessage": "Ocorreu um erro de negócio",
                        "internalMessage": "Ocorreu um erro interno na chamada do serviço externo"
                    },
                    {
                        "code": 20,
                        "userMessage": "Ocorreu um outro erro de negócio",
                        "internalMessage": "Ocorreu um outro erro interno na chamada do serviço externo"
                    }
                ]
            })
        });

    });

    test("ao instanciar um novo model com header contendo informações encodadas em base64 da próxima paginação", () => {

        const body = {
            "id": 1,
            "name": "name",
            "description": "description"
        };

        const headers = {
            "ExclusiveStartKey": {
                "id": "e9e16e58-4822-4d7c-9564-6a19687926f5"
            }
        };

        const lambdaModel = new Commons.LambdaModel("requestId", 200, body, headers).getModel();

        expect(lambdaModel).toEqual({
            "statusCode": 200,
            "body": JSON.stringify({
                "requestId": "requestId",
                "id": 1,
                "name": "name",
                "description": "description"
            }),
            "headers": {
                "pagination-token": "eyJpZCI6ImU5ZTE2ZTU4LTQ4MjItNGQ3Yy05NTY0LTZhMTk2ODc5MjZmNSJ9"
            }
        });

    });

});

describe("validar a biblioteca do Audit", () => {

    test("ao não informar os campos obrigatórios", () => {

        expect(() => {

            new Commons.Audit().setAuditData();

        }).toThrowError();

        try {

            new Commons.Audit().setAuditData();

        } catch (error) {

            expect(error).toMatchObject({"errors":
            [
                {"code": 10,
                    "userMessage": "O parâmetro 'jsonData' é obrigatório",
                    "internalMessage": "Erro de validação do payload de entrada"},
                {"code": 10,
                    "userMessage": "O parâmetro 'identity' é obrigatório",
                    "internalMessage": "Erro de validação do payload de entrada"},
                {"code": 10,
                    "userMessage": "O parâmetro 'operation' é obrigatório",
                    "internalMessage": "Erro de validação do payload de entrada"}
            ]});

        }

        expect(() => {

            new Commons.Audit().setAuditData(null, {}, null);

        }).toThrowError();

        try {

            new Commons.Audit().setAuditData(null, {}, null);

        } catch (error) {

            expect(error).toMatchObject({"errors":
            [
                {"code": 10,
                    "userMessage": "O parâmetro 'jsonData' é obrigatório",
                    "internalMessage": "Erro de validação do payload de entrada"},
                {"code": 10,
                    "userMessage": "O parâmetro 'identity.user' é obrigatório",
                    "internalMessage": "Erro de validação do payload de entrada"},
                {"code": 10,
                    "userMessage": "O parâmetro 'operation' é obrigatório",
                    "internalMessage": "Erro de validação do payload de entrada"}
            ]});

        }

    });

    test("ao definir auditoria do tipo CREATE", () => {

        const body = {
            "id": 1,
            "name": "name",
            "description": "description"
        };

        const identity = {
            "user": "PAPAI"
        };

        new Commons.Audit().setAuditData(body, identity, Commons.Audit.AUDIT_OPERATIONS.CREATE);

        expect(body).toBeDefined();
        expect(body.createdBy).toEqual("PAPAI");
        expect(body.createdAt).toBeDefined();

    });

    test("ao definir auditoria do tipo UPDATE", () => {

        const body = {
            "id": 1,
            "name": "name",
            "description": "description"
        };

        const identity = {
            "user": "PAPAI"
        };

        new Commons.Audit().setAuditData(body, identity, Commons.Audit.AUDIT_OPERATIONS.UPDATE);

        expect(body).toBeDefined();
        expect(body.updatedBy).toEqual("PAPAI");
        expect(body.updatedAt).toBeDefined();

    });

    test("ao definir auditoria do tipo CREATE e UPDATE", () => {

        const body = {
            "id": 1,
            "name": "name",
            "description": "description"
        };

        const identity = {
            "user": "PAPAI"
        };

        new Commons.Audit().setAuditData(body, identity, Commons.Audit.AUDIT_OPERATIONS.CREATE);

        identity.user = "PAPAI 2";

        new Commons.Audit().setAuditData(body, identity, Commons.Audit.AUDIT_OPERATIONS.UPDATE);

        expect(body).toBeDefined();
        expect(body.createdBy).toEqual("PAPAI");
        expect(body.createdAt).toBeDefined();
        expect(body.updatedBy).toEqual("PAPAI 2");
        expect(body.updatedAt).toBeDefined();

    });

});

describe("validar a biblioteca do Contract Validator", () => {

    test("se o valor é um UUID válido", () => {

        const validator = new Commons.ValidationContract();

        validator.isUUID("56568416-9848-43a0-8932-02a6ab6f1619", 4, "O valor fornecido não é um UUID válido");

        expect(validator.isValid()).toBeTruthy();
        expect(validator.getErrors().errors.length === 0).toBeTruthy();

    });

    test("se o valor é um UUID inválido", () => {

        const validator = new Commons.ValidationContract();

        validator.isUUID("UUID INVALIDO", 4, "O valor fornecido não é um UUID válido");

        expect(!validator.isValid()).toBeTruthy();
        expect(validator.getErrors().errors.length > 0).toBeTruthy();
        expect(validator.getErrors().errors[0].userMessage).toBe("O valor fornecido não é um UUID válido");

    });

    test("se o valor é requerido", () => {

        const validator = new Commons.ValidationContract();

        validator.isRequired("", "O valor é requerido");

        expect(!validator.isValid()).toBeTruthy();
        expect(validator.getErrors().errors.length > 0).toBeTruthy();
        expect(validator.getErrors().errors[0].userMessage).toBe("O valor é requerido");

        validator.clear();
        validator.isRequired("Valor válido", "O valor é requerido");

        expect(validator.isValid()).toBeTruthy();
        expect(validator.getErrors().errors.length === 0).toBeTruthy();

    });

    test("se o valor tem um tamanho mínimo de 3", () => {

        const validator = new Commons.ValidationContract();

        validator.hasMinLen("ab", 3, "O valor não possui a quantidade mínima permitida");

        expect(!validator.isValid()).toBeTruthy();
        expect(validator.getErrors().errors.length > 0).toBeTruthy();
        expect(validator.getErrors().errors[0].userMessage).toBe("O valor não possui a quantidade mínima permitida");

        validator.clear();
        validator.hasMinLen("abc", 3, "O valor não possui a quantidade mínima permitida");

        expect(validator.isValid()).toBeTruthy();
        expect(validator.getErrors().errors.length === 0).toBeTruthy();

    });

    test("se o valor tem um tamanho máximo de 10", () => {

        const validator = new Commons.ValidationContract();

        validator.hasMaxLen("abcd", 3, "O valor possui mais caracter que o máximo permitido");

        expect(!validator.isValid()).toBeTruthy();
        expect(validator.getErrors().errors.length > 0).toBeTruthy();
        expect(validator.getErrors().errors[0].userMessage).toBe("O valor possui mais caracter que o máximo permitido");

        validator.clear();
        validator.hasMaxLen("abc", 3, "O valor possui mais caracter que o máximo permitido");

        expect(validator.isValid()).toBeTruthy();
        expect(validator.getErrors().errors.length === 0).toBeTruthy();

    });

    test("se o valor tem um tamanho fixo de 10 posições", () => {

        const validator = new Commons.ValidationContract();

        validator.isFixedLen("abcd", 3, "O valor não possui a quantidade exata de caracteres");

        expect(!validator.isValid()).toBeTruthy();
        expect(validator.getErrors().errors.length > 0).toBeTruthy();
        expect(validator.getErrors().errors[0].userMessage).toBe("O valor não possui a quantidade exata de caracteres");

        validator.clear();
        validator.isFixedLen("ab", 3, "O valor não possui a quantidade exata de caracteres");

        expect(!validator.isValid()).toBeTruthy();
        expect(validator.getErrors().errors.length > 0).toBeTruthy();
        expect(validator.getErrors().errors[0].userMessage).toBe("O valor não possui a quantidade exata de caracteres");


        validator.clear();
        validator.isFixedLen("abc", 3, "O valor não possui a quantidade exata de caracteres");

        expect(validator.isValid()).toBeTruthy();
        expect(validator.getErrors().errors.length === 0).toBeTruthy();

    });

    test("se o valor é um e-mail válido", () => {

        const validator = new Commons.ValidationContract();

        validator.isEmail("papai@papai", "O e-mail está inválido");

        expect(!validator.isValid()).toBeTruthy();
        expect(validator.getErrors().errors.length > 0).toBeTruthy();
        expect(validator.getErrors().errors[0].userMessage).toBe("O e-mail está inválido");

        validator.clear();
        validator.isEmail("papai", "O e-mail está inválido");

        expect(!validator.isValid()).toBeTruthy();
        expect(validator.getErrors().errors.length > 0).toBeTruthy();
        expect(validator.getErrors().errors[0].userMessage).toBe("O e-mail está inválido");

        validator.clear();
        validator.isEmail("papai.com,br", "O e-mail está inválido");

        expect(!validator.isValid()).toBeTruthy();
        expect(validator.getErrors().errors.length > 0).toBeTruthy();
        expect(validator.getErrors().errors[0].userMessage).toBe("O e-mail está inválido");

        validator.clear();
        validator.isEmail("papai@bla.com,br", "O e-mail está inválido");

        expect(!validator.isValid()).toBeTruthy();
        expect(validator.getErrors().errors.length > 0).toBeTruthy();
        expect(validator.getErrors().errors[0].userMessage).toBe("O e-mail está inválido");

        validator.clear();
        validator.isEmail("papai@.com.br", "O e-mail está inválido");

        expect(!validator.isValid()).toBeTruthy();
        expect(validator.getErrors().errors.length > 0).toBeTruthy();
        expect(validator.getErrors().errors[0].userMessage).toBe("O e-mail está inválido");

        validator.clear();
        validator.isEmail("papai@papai.com", "O e-mail está inválido");

        expect(validator.isValid()).toBeTruthy();
        expect(validator.getErrors().errors.length === 0).toBeTruthy();

        validator.clear();
        validator.isEmail("papai@papai.com.br", "O e-mail está inválido");

        expect(validator.isValid()).toBeTruthy();
        expect(validator.getErrors().errors.length === 0).toBeTruthy();


    });

    test("se o valor é um número", () => {

        const validator = new Commons.ValidationContract();

        validator.isNumber("abc", "O valor não é um número");
        expect(!validator.isValid()).toBeTruthy();
        expect(validator.getErrors().errors.length > 0).toBeTruthy();
        expect(validator.getErrors().errors[0].userMessage).toBe("O valor não é um número");

        validator.clear();
        validator.isNumber("", "O valor não é um número");
        expect(!validator.isValid()).toBeTruthy();
        expect(validator.getErrors().errors.length > 0).toBeTruthy();
        expect(validator.getErrors().errors[0].userMessage).toBe("O valor não é um número");

        validator.clear();
        validator.isNumber(true, "O valor não é um número");
        expect(!validator.isValid()).toBeTruthy();
        expect(validator.getErrors().errors.length > 0).toBeTruthy();
        expect(validator.getErrors().errors[0].userMessage).toBe("O valor não é um número");

        validator.clear();
        validator.isNumber({}, "O valor não é um número");
        expect(!validator.isValid()).toBeTruthy();
        expect(validator.getErrors().errors.length > 0).toBeTruthy();
        expect(validator.getErrors().errors[0].userMessage).toBe("O valor não é um número");

        validator.clear();
        validator.isNumber(1, "O valor não é um número");
        expect(validator.isValid()).toBeTruthy();
        expect(validator.getErrors().errors.length === 0).toBeTruthy();

    });

    test("se o valor é um número positivo", () => {

        const validator = new Commons.ValidationContract();

        validator.isPositive(-1, "O valor fornecido não é positivo");
        expect(!validator.isValid()).toBeTruthy();
        expect(validator.getErrors().errors.length > 0).toBeTruthy();
        expect(validator.getErrors().errors[0].userMessage).toBe("O valor fornecido não é positivo");

        validator.clear();
        validator.isPositive(0, "O valor fornecido não é positivo");
        expect(validator.isValid()).toBeTruthy();
        expect(validator.getErrors().errors.length === 0).toBeTruthy();

        validator.clear();
        validator.isPositive(1, "O valor fornecido não é positivo");
        expect(validator.isValid()).toBeTruthy();
        expect(validator.getErrors().errors.length === 0).toBeTruthy();

    });

    test("se o valor é um número negativo", () => {

        const validator = new Commons.ValidationContract();

        validator.isNegative(1, "O valor fornecido não é negativo");
        expect(!validator.isValid()).toBeTruthy();
        expect(validator.getErrors().errors.length > 0).toBeTruthy();
        expect(validator.getErrors().errors[0].userMessage).toBe("O valor fornecido não é negativo");

        validator.clear();
        validator.isNegative(0, "O valor fornecido não é negativo");
        expect(!validator.isValid()).toBeTruthy();
        expect(validator.getErrors().errors.length > 0).toBeTruthy();
        expect(validator.getErrors().errors[0].userMessage).toBe("O valor fornecido não é negativo");

        validator.clear();
        validator.isNegative(-1, "O valor fornecido não é negativo");
        expect(validator.isValid()).toBeTruthy();
        expect(validator.getErrors().errors.length === 0).toBeTruthy();

    });

});

describe("validar a biblioteca do DynamoDB", () => {

    test("se o payload para retornar os campos no Dynamo está consistente", () => {

        const dynamoDB = new Commons.DynamoDB();
        const params = {};


        dynamoDB.setAttributesToRetrieve(params, "a, b, c, d");

        expect(params.ProjectionExpression).toBeDefined();
        expect(params.ProjectionExpression).toBe("#a,#b,#c,#d");
        expect(params.ExpressionAttributeNames).toBeDefined();
        expect(params.ExpressionAttributeNames).toMatchObject({"#a": "a",
            "#b": "b",
            "#c": "c",
            "#d": "d"});
        expect(params).toMatchObject({"ProjectionExpression": "#a,#b,#c,#d",
            "ExpressionAttributeNames": {"#a": "a",
                "#b": "b",
                "#c": "c",
                "#d": "d"}});

    });

    test("se o client é retornado", () => {

        const dynamoDB = new Commons.DynamoDB();

        const docClient = dynamoDB.getDocumentClient();

        expect(docClient).toBeDefined();

    });

});
