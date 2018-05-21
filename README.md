# lambda-error-handler

Error handling decorator for AWS Lambda functions when used with the Serverless framework

## Usage

This library exposes a decorator function that is used to wrap an async AWS Lambda function in node.js to provide error handling for that lambda. This allows you to leave the catching of an error and the correct formatting of the response in that situation to this decorator.

First you need to install this library:

```
yarn add lambda-error-handler
```

Then you can use it like so:

```js
"use strict";

const withErrorHandling = require("lambda-error-handler");

async function handler(event) {
  // some real content here
  return { body: "some result" };
}

module.exports.handler = withErrorHandling(handler);
```

## License

[MIT](LICENSE)
