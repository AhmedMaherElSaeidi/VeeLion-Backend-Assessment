const reportsService = require("../services/reports.service");
const { parseNonNegativeNumber } = require("../utils/reportsValidator");

async function getTasksSummary(req, res) {
  const hours = parseNonNegativeNumber(req.query.hours, "hours");
  const minutes = parseNonNegativeNumber(req.query.minutes, "minutes");
  const seconds = parseNonNegativeNumber(req.query.seconds, "seconds");

  const hasCustomWindow = hours !== undefined || minutes !== undefined || seconds !== undefined;
  const window = hasCustomWindow
    ? { hours: hours || 0, minutes: minutes || 0, seconds: seconds || 0 }
    : undefined;

  const summary = await reportsService.getTasksSummary(window);
  res.status(200).json(summary);
}

module.exports = {
  getTasksSummary,
};
