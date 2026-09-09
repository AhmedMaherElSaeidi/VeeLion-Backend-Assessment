const activityService = require('../services/activity.service');
const { validateCreateActivity } = require('../utils/activityValidator');

async function getActivity(req, res) {
  const activity = await activityService.getAllActivity();
  res.status(200).json(activity);
}

async function addActivity(req, res) {
  const payload = validateCreateActivity(req.body || {});
  const created = await activityService.createNewActivity(payload);
  res.status(201).json(created);
}

module.exports = {
  getActivity,
  addActivity,
};
 