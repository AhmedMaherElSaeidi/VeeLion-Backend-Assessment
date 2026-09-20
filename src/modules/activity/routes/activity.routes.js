const express = require('express');

const asyncHandler = require('../../../middleware/asyncHandler');
const activityController = require('../controllers/activity.controller');

const activityRouter = express.Router();

activityRouter.get('/', asyncHandler(activityController.getActivity));
activityRouter.post('/', asyncHandler(activityController.addActivity));
activityRouter.delete('/:id', asyncHandler(activityController.removeActivity));

module.exports = activityRouter;