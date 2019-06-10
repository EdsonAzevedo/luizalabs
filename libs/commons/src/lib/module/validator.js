"use strict";

const Constants = require("../constants"),
    Error = require("../model/error-model"),
    uuidValidator = require("uuid-validate"),
    _ = require("lodash");

class ValidationContract {

    constructor () {

        this.errors = [];

    }

    isUUID (value, version, message) {


        if (!uuidValidator(value, version)) {

            this.errors.push(new Error(message, Constants.ERROR_MESSAGE.VALIDATION_ERROR_REQUEST_PAYLOAD, Constants.ERROR_MESSAGE.VALIDATION_ERROR_REQUEST_PAYLOAD_CODE).getModel());

        }

    }

    isRequired (value, message) {

        if (!value || value.length <= 0) {

            if (typeof value !== "boolean") {

                this.errors.push(new Error(message, Constants.ERROR_MESSAGE.VALIDATION_ERROR_REQUEST_PAYLOAD, Constants.ERROR_MESSAGE.VALIDATION_ERROR_REQUEST_PAYLOAD_CODE).getModel());

            }

        }

    }

    hasMinLen (value, min, message) {

        if (!value || value.length < min) {

            this.errors.push(new Error(message, Constants.ERROR_MESSAGE.VALIDATION_ERROR_REQUEST_PAYLOAD, Constants.ERROR_MESSAGE.VALIDATION_ERROR_REQUEST_PAYLOAD_CODE).getModel());

        }

    }

    hasMaxLen (value, max, message) {

        if (!value || value.length > max) {

            this.errors.push(new Error(message, Constants.ERROR_MESSAGE.VALIDATION_ERROR_REQUEST_PAYLOAD, Constants.ERROR_MESSAGE.VALIDATION_ERROR_REQUEST_PAYLOAD_CODE).getModel());

        }

    }

    isFixedLen (value, len, message) {

        if (value.length !== len) {

            this.errors.push(new Error(message, Constants.ERROR_MESSAGE.VALIDATION_ERROR_REQUEST_PAYLOAD, Constants.ERROR_MESSAGE.VALIDATION_ERROR_REQUEST_PAYLOAD_CODE).getModel());

        }

    }

    isEmail (value, message) {

        const reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);

        if (!reg.test(value)) {

            this.errors.push(new Error(message, Constants.ERROR_MESSAGE.VALIDATION_ERROR_REQUEST_PAYLOAD, Constants.ERROR_MESSAGE.VALIDATION_ERROR_REQUEST_PAYLOAD_CODE).getModel());

        }

    }

    isNumber (value, message) {

        if (!_.isNumber(value)) {

            this.errors.push(new Error(message, Constants.ERROR_MESSAGE.VALIDATION_ERROR_REQUEST_PAYLOAD, Constants.ERROR_MESSAGE.VALIDATION_ERROR_REQUEST_PAYLOAD_CODE).getModel());

        }

    }

    isPositive (value, message) {

        if (value < 0) {

            this.errors.push(new Error(message, Constants.ERROR_MESSAGE.VALIDATION_ERROR_REQUEST_PAYLOAD, Constants.ERROR_MESSAGE.VALIDATION_ERROR_REQUEST_PAYLOAD_CODE).getModel());

        }

    }

    isNegative (value, message) {

        if (value >= 0) {

            this.errors.push(new Error(message, Constants.ERROR_MESSAGE.VALIDATION_ERROR_REQUEST_PAYLOAD, Constants.ERROR_MESSAGE.VALIDATION_ERROR_REQUEST_PAYLOAD_CODE).getModel());

        }

    }

    getErrors () {

        return {"errors": this.errors};

    }

    clear () {

        this.errors = [];

    }

    isValid () {

        return this.errors.length === 0;

    }

}

module.exports = ValidationContract;
