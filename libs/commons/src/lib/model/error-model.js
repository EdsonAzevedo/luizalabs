"use strict";

class ErrorModel {

    constructor (userMessage, internalMessage, code) {

        this.code = code;
        this.userMessage = userMessage;
        this.internalMessage = internalMessage;

    }

    getModel () {

        return this;

    }

}

module.exports = ErrorModel;
