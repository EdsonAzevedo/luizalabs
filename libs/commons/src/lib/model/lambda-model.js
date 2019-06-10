"use strict";

const ErrorModel = require("./error-model");

class LambdaModel {

    constructor (requestId, statusCode, body, headers) {

        this.requestId = requestId;
        this.statusCode = statusCode;
        this.body = body;
        this.headers = headers;

    }

    getModel () {

        if (this.body instanceof Array) {

            let bodyAttributeName = "";

            if (this.body[0] instanceof ErrorModel) {

                this.body = {
                    "requestId": this.requestId,
                    "errors": this.body
                };
    
            } else {

                this.body = {
                    "requestId": this.requestId,
                    "numberEmployees": this.body.length,
                    "employees": this.body
                };

            }
            
        } else {

            this.body = {"requestId": this.requestId,
                ...this.body};

        }

        const response = {
            "statusCode": this.statusCode,
            "body": JSON.stringify(this.body)
        };

        if (typeof this.headers !== "undefined" && typeof this.headers.ExclusiveStartKey !== "undefined") {

            const buff = Buffer.from(JSON.stringify(this.headers.ExclusiveStartKey));
            const base64data = buff.toString("base64");

            response.headers = {
                "pagination-token": base64data
            };

        }

        return response;

    }

}

module.exports = LambdaModel;
