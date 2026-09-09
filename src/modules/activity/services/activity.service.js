const path = require('node:path');

const { createId } = require('../../../utils/id');
const { readJsonArray, writeJsonArray } = require('../../../utils/jsonStore');

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

module.exports = {
  getAllActivity,
  createNewActivity,
};
