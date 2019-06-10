"use strict";

module.exports = {

    "post": jest.fn(() => Promise.resolve({"data": {"status": "ok"}}))

};
