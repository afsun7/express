function validationMapper(error) {
  const { details } = error;
  let invalidParams = {};
  if (details.length > 0) {
    for (const item of details) {
      invalidParams[item.context.key] = item.message.replace(/[\"\'\\]*/g, "");
    }
  }
  return invalidParams;
}

module.exports = {
  validationMapper,
};
