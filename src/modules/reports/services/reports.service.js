const path = require("node:path");

const { readJsonArray } = require("../../../utils/jsonStore");

const TASKS_FILE_PATH = path.join(process.cwd(), "data", "tasks.json");
const ACTIVITY_FILE_PATH = path.join(process.cwd(), "data", "activity.json");

const DEFAULT_WINDOW = { hours: 24, minutes: 0, seconds: 0 };

async function getTasksSummary(window = DEFAULT_WINDOW) {
  const tasks = await readJsonArray(TASKS_FILE_PATH);
  const activity = await readJsonArray(ACTIVITY_FILE_PATH);

  const byStatus = { todo: 0, "in-progress": 0, done: 0 };
  for (const task of tasks) {
    byStatus[task.completed ? "done" : "todo"] += 1;
  }

  const windowMs =
    ((window.hours || 0) * 3600 + (window.minutes || 0) * 60 + (window.seconds || 0)) * 1000;
  const cutoff = Date.now() - windowMs;

  const recentActivityCount = activity.filter((entry) => Date.parse(entry.when) >= cutoff).length;

  return {
    total: tasks.length,
    byStatus,
    recentActivityCount,
  };
}
module.exports = {
  getTasksSummary,
};
