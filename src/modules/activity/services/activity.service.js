const path = require('node:path');

const { createId } = require('../../../utils/id');
const { readJsonArray, writeJsonArray } = require('../../../utils/jsonStore');
const HttpError = require('../../../utils/httpError');

const ACTIVITY_FILE_PATH = path.join(process.cwd(), 'data', 'activity.json');

async function getAllActivity() {
  return readJsonArray(ACTIVITY_FILE_PATH);
}

async function createNewActivity(payload) {
  const activity = await readJsonArray(ACTIVITY_FILE_PATH);

  const newEntry = {
    id: createId(),
    action: payload.action,
    info: payload.info ?? null,
    when: new Date().toISOString(),
  };

  activity.push(newEntry);
  await writeJsonArray(ACTIVITY_FILE_PATH, activity);

  return newEntry;
}

async function deleteActivity(activityId) {
  const activity = await readJsonArray(ACTIVITY_FILE_PATH);
  const index = activity.findIndex((item) => item.id === activityId);

  if (index === -1) {
    throw new HttpError(404, 'Activity entry not found.');
  }

  const [removed] = activity.splice(index, 1);
  await writeJsonArray(ACTIVITY_FILE_PATH, activity);

  return removed;
}

module.exports = {
  getAllActivity,
  createNewActivity,
  deleteActivity,
};