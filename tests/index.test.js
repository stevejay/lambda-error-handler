const withErrorHandling = require("../index");

it("should handle a successful handler invocation", async () => {
  const result = await withErrorHandling(async () => ({
    body: "some result"
  }))();

  expect(result).toEqual({ body: "some result" });
});

it("should handle a conditional check failure", async () => {
  const result = await withErrorHandling(async () => {
    const error = new Error();
    error.code = "ConditionalCheckFailedException";
    throw error;
  })();

  expect(result).toEqual({
    statusCode: 400,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    },
    body: '{"error":"[400] Stale Data"}'
  });
});

it("should handle an unknown error", async () => {
  const result = await withErrorHandling(async () => {
    const error = new Error("Some error");
    throw error;
  })();

  expect(result).toEqual({
    statusCode: 500,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    },
    body: '{"error":"[500] Some error"}'
  });
});

it("should handle an unknown error with no message", async () => {
  const result = await withErrorHandling(async () => {
    const error = new Error();
    throw error;
  })();

  expect(result).toEqual({
    statusCode: 500,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    },
    body: '{"error":"[500] Unknown error"}'
  });
});

it("should handle a formatted error", async () => {
  const result = await withErrorHandling(async () => {
    const error = new Error("[404] Not found");
    throw error;
  })();

  expect(result).toEqual({
    statusCode: 404,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    },
    body: '{"error":"[404] Not found"}'
  });
});
