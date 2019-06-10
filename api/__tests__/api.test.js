const Axios = require("axios");
const Constants = require("../src/util/constants");
const TestConstants = require("../src/util/employee-api-test-costants");
const urlBase = "http://127.0.0.1:3000/v1/api";

/*
 * Mudar a chave de autenticação conforme necessidade
 * TODO: ATUALIZE COM A CHAVE GERADA DA SUA MAQUINA!;
 */
Axios.defaults.headers.common["x-api-key"] = "d41d8cd98f00b204e9800998ecf8427e";
Axios.defaults.headers.common.limit = "10";

describe("validar operações CRUD da API", () => {

    test("ao persistir um novo recurso", async () => {

        let response = {};

        try {

            response = await Axios.post(`${urlBase}/employee`, TestConstants.REQUEST_EMPLOYEE_OK);

        } catch (error) {

            response = error.response;

        }

        expect(response.status).toBe(Constants.HTTP_CODE.CREATED);
        expect(response.data).toBeDefined();
        expect(response.data.id).toBeDefined();

        try {

            response = await Axios.delete(`${urlBase}/employee/${response.data.id}`);

        } catch (error) {

            response = error.response;

        }

        expect(response.status).toBe(Constants.HTTP_CODE.NO_CONTENT);

    });

    test("ao retornar um array de recursos", async () => {

        let response = {};

        try {

            response = await Axios.get(`${urlBase}/employee`);

        } catch (error) {

            response = error.response;

        }

        expect(response.status).toBe(Constants.HTTP_CODE.OK);
        expect(response.data.employees).toBeDefined();
        expect(response.data.employees.length).toBeGreaterThan(0);

    }, 30000);

    test("ao retornar um recurso por ID", async () => {

        let response = {};
        let idCreated = null;

        try {

            response = await Axios.post(`${urlBase}/employee`, TestConstants.REQUEST_EMPLOYEE_OK);

        } catch (error) {

            response = error.response;

        }

        expect(response.status).toBe(Constants.HTTP_CODE.CREATED);
        expect(response.data).toBeDefined();
        expect(response.data.id).toBeDefined();
        idCreated = response.data.id;

        try {

            response = await Axios.get(`${urlBase}/employee/${idCreated}`);

        } catch (error) {

            response = error.response;

        }

        expect(response.status).toBe(Constants.HTTP_CODE.OK);
        expect(response.data).toBeDefined();
        expect(response.data.id).toBeDefined();
        expect(response.data.id === idCreated).toBeTruthy();

        try {

            response = await Axios.delete(`${urlBase}/employee/${idCreated}`);

        } catch (error) {

            response = error.response;

        }

        expect(response.status).toBe(Constants.HTTP_CODE.NO_CONTENT);

    });

    test("ao deletar um recurso", async () => {

        let response = {};
        let idCreated = null;

        try {

            response = await Axios.post(`${urlBase}/employee`, TestConstants.REQUEST_EMPLOYEE_OK);

        } catch (error) {

            response = error.response;

        }

        expect(response.status).toBe(Constants.HTTP_CODE.CREATED);
        expect(response.data).toBeDefined();
        expect(response.data.id).toBeDefined();
        idCreated = response.data.id;

        try {

            response = await Axios.delete(`${urlBase}/employee/${response.data.id}`);

        } catch (error) {

            console.log(error);

        }

        expect(response.status).toBe(Constants.HTTP_CODE.NO_CONTENT);

        try {

            response = await Axios.get(`${urlBase}/employee/${idCreated}`);

        } catch (error) {

            response = error.response;

        }

        expect(response.data).toBeDefined();
        expect(response.data.errors).toBeDefined();
        expect(response.data.errors).toContainEqual(TestConstants.RESPONSE_ERROR_NOTFOUND);

    });

});


describe("validar as consistências da operação de inclusão do recurso", () => {

    test("se os campos estão sendo validados", async () => {

        let response = {};

        try {

            response = await Axios.post(`${urlBase}/employee`, {});

        } catch (error) {

            response = error.response;

        }

        expect(response.status).toBe(Constants.HTTP_CODE.BAD_REQUEST);
        expect(response).toBeDefined();
        expect(response.data).toBeDefined();
        expect(response.data.errors).toBeDefined();
        expect(response.data.errors).toMatchObject(TestConstants.RESPONSE_ERROR_PAYLOAD);

    });

});


describe("validar as consistências da operação de remoção do recurso", () => {

    test("se o ID é um número válido", async () => {

        let response = {};

        try {

            await Axios.delete(`${urlBase}/employee/ID_INVALIDO`);

        } catch (error) {

            response = error.response;

        }

        expect(response.status).toBe(Constants.HTTP_CODE.BAD_REQUEST);
        expect(response.data.errors).toBeDefined();
        expect(response.data.errors).toContainEqual({
            "code": 10,
            "userMessage": "O identificador não é válido",
            "internalMessage": "Erro de validação do payload de entrada"
        });

    });

    test("se ao passar um ID inválido é retornado um erro de recurso não encontrado", async () => {

        let response = {};

        try {

            await Axios.delete(`${urlBase}/employee/${"ID_INVALIDO"}`);

        } catch (error) {

            response = error.response;

        }

        expect(response.status).toBe(Constants.HTTP_CODE.BAD_REQUEST);
        expect(response.data).toBeDefined();
        expect(response.data.errors).toContainEqual({
            "code": 10,
            "userMessage": "O identificador não é válido",
            "internalMessage": "Erro de validação do payload de entrada"
        });

    });

});

describe("validar as consistências da operação de busca por ID", () => {

    test("se o ID é um número válido", async () => {

        let response = {};

        try {

            await Axios.get(`${urlBase}/employee/ID_INVALIDO`);

        } catch (error) {

            response = error.response;

        }

        expect(response.status).toBe(Constants.HTTP_CODE.BAD_REQUEST);
        expect(response.data).toBeDefined();
        expect(response.data.errors).toBeDefined();
        expect(response.data.errors).toContainEqual({
            "code": 10,
            "userMessage": "O identificador não é válido",
            "internalMessage": "Erro de validação do payload de entrada"
        });

    });

    test("se ao passar um ID inválido é retornado um erro de recurso não encontrado", async () => {

        let response = {};

        try {

            await Axios.get(`${urlBase}/employee/${"89062a37-850d-4ffa-bb2b-67bd5cfdd67f"}`);

        } catch (error) {

            response = error.response;

        }

        expect(response.status).toBe(Constants.HTTP_CODE.NOT_FOUND);
        expect(response.data).toBeDefined();
        expect(response.data.errors).toBeDefined();
        expect(response.data.errors).toContainEqual({
            "code": 20,
            "userMessage": "O recurso solicitado não existe",
            "internalMessage": "A consulta não retornou nenhum resultado"
        });

    });

});
