const HttpError = require('../../../utils/httpError');

const ALLOWED_FIELDS = ['action', 'info'];

function validatePayloadShape(payload) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    throw new HttpError(400, 'Body must be a JSON object.');
  }
}

function ensureNoUnknownFields(payload) {
  const unknownFields = Object.keys(payload).filter(
    (field) => !ALLOWED_FIELDS.includes(field)
  );

  if (unknownFields.length > 0) {
    throw new HttpError(400, 'Body contains unsupported fields.', {
      unsupportedFields: unknownFields,
    });
  }
}

function validateCreateActivity(payload) {
  validatePayloadShape(payload);
  ensureNoUnknownFields(payload);

  if (typeof payload.action !== 'string' || !payload.action.trim()) {
    throw new HttpError(400, '"action" is required and must be a non-empty string.');
  }

  if (payload.info !== undefined && typeof payload.info !== 'string') {
    throw new HttpError(400, '"info" must be a string.');
  }

  return {
    action: payload.action.trim(),
    info: typeof payload.info === 'string' ? payload.info.trim() : undefined,
  };
}

module.exports = {
  validateCreateActivity,
};
