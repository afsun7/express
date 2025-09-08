const error = {
  name: "ValidationError",
  message: "Validation Failed",
  statusCode: 400,
  error: "Bad Request",
  details: {
    body: [
      {
        message: '"email" must be a valid email',
        path: ["email"],
        type: "string.email",
        context: {
          value: "sodgf",
          invalids: ["sodgf"],
          label: "email",
          key: "email",
        },
      },
    ],
  },
};
function validationMapper(error) {
  const { details } = error;
  let invalidParams = {};
  if (details.body.length > 0) {
    for (const item of details.body) {
      invalidParams[item.context.key] = item.message.replace(/[\"\'\\]*/g, "");
    }
  }
  return invalidParams;
}

module.exports = {
  validationMapper,
};
