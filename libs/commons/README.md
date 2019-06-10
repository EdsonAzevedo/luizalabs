{:toc}

# Apoio Técnico

Lib para expor os módulos comuns entre as APIs.

## Configuração e Uso

Requer [Node.js](https://nodejs.org/) (**versão 8 ou superior é necessário**).

### Adicionar dependência

Adicionar a seguinte dependência no arquivo package.json da API que irá utilizar a lib.

```text
"commons": "file:../commons"
```

### Instalação do módulo Node

```text
$ cd <NOME_LIB>
$ npm install ou yarn
```

## Exemplo de uso

```javascript
const Commons = require("commons");

// obtem o objeto de Erro
const errorModel = new Commons.ErrorModel(userMessage, internalMessage, code).getModel();

// obtem o objeto do Labda
const lambdaModel = new Commons.LambdaModel(requestId, statusCode, body, headers).getModel();

// define no jsonData os atributos necessários para realizar auditoria quando o documento é criado/atualizado
new Commons.Audit().setAuditData(jsonData, identity, Commons.Audit.AUDIT_OPERATIONS.CREATE);
new Commons.Audit().setAuditData(jsonData, identity, Commons.Audit.AUDIT_OPERATIONS.UPDATE);

// valida por campo obrigatório
const contract = new Commons.ValidationContract();
contract.isRequired(value, message);

// define no params a ser enviado para o DynamoDB quais campos deverão ser retornados
const dynamo = new Commons.DynamoDB();
dynamo.setAttributesToRetrieve(params, attributesToRetrieve);

// obtem o documentClient para realizar operações no DynamoDB
const docClient = dynamo.getDocumentClient();

```

