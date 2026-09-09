const HttpError = require("../../../utils/httpError");

function parseNonNegativeNumber(value, fieldName) {
  if (value === undefined) return undefined;

  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0) {
    throw new HttpError(400, `"${fieldName}" query param must be a non-negative number.`);
  }
  return parsed;
}

module.exports = {
  parseNonNegativeNumber,
};
