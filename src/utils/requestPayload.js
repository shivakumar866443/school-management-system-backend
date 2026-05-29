import { toFileRecords } from '../middleware/upload.middleware.js';

const jsonFields = ['extraFields', 'data', 'history'];

function parseMaybeJson(value) {
  if (typeof value !== 'string') {
    return value;
  }

  const trimmed = value.trim();
  if (!trimmed || (!trimmed.startsWith('{') && !trimmed.startsWith('['))) {
    return value;
  }

  try {
    return JSON.parse(trimmed);
  } catch {
    return value;
  }
}

export function buildPayload(req) {
  const payload = { ...req.body };

  for (const field of jsonFields) {
    if (field in payload) {
      payload[field] = parseMaybeJson(payload[field]);
    }
  }

  if (req.files?.length) {
    const newFiles = toFileRecords(req.files);
    payload.files = [...(Array.isArray(payload.files) ? payload.files : []), ...newFiles];
  }

  return payload;
}
