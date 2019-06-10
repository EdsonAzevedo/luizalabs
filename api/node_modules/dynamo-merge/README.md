# dynamo-merge

[![Build Status](https://travis-ci.org/wolverian/dynamo-merge.svg?branch=master)](https://travis-ci.org/wolverian/dynamo-merge)
[![NPM Version](https://img.shields.io/npm/v/dynamo-merge.svg)](https://www.npmjs.com/package/dynamo-merge)

## Installation

```shell
yarn add dynamo-merge # or npm install dynamo-merge --save
```

## Usage

``` js
import merge from "dynamo-merge"

const result = await documentClient.update({
    TableName: "users",
    Key: {email},
    ...merge(updatedUserAttributes),
})
```

Look at `test.js` for example use cases and the expected output.

## Tests

To run tests, use

``` shell
yarn test # or npm test
```

## License

MIT