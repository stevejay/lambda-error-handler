"use strict";

const ERROR_CODE_REGEX = /^\[(\d\d\d)\]/;

module.exports = exports = function(handler) {
  return async function(event, context) {
    try {
      return await handler(event, context);
    } catch (err) {
      let statusCode = null;
      let message = null;

      if (err.code === "ConditionalCheckFailedException") {
        message = "[400] Stale Data";
        statusCode = 400;
      } else {
        const errorCodeMatch = (err.message || "").match(ERROR_CODE_REGEX);

        if (!errorCodeMatch) {
          message = "[500] " + (err.message || "Unknown error");
          statusCode = 500;
        } else {
          message = err.message;
          statusCode = parseInt(errorCodeMatch[1]);
        }
      }

      const body = JSON.stringify({ error: message });

      return {
        statusCode,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true
        },
        body
      };
    }
  };
};
