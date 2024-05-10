const express = require('express');
const router = express.Router();

const {
  getTours,
  postTour,
  getTour,
  updateTour,
} = require('../controller/tourController');

const { protect } = require('../controller/authController');

router.route('/tours').get(protect, getTours).post(postTour);
router.route('/tours/:id').get(getTour).patch(updateTour);

module.exports = router;
