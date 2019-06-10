"use strict";

class ApiMainModel {

    constructor (id, name, email, department) {

        this.id = id;
        this.name = name;
        this.email = email;
        this.department = department;

    }

    getModel () {

        return this;

    }

}

module.exports = ApiMainModel;
