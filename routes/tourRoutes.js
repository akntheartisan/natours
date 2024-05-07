const express = require('express');
const router =  express.Router();

const {getTours,postTour,getTour,updateTour} = require('../controller/tourController');

// router.param('id',checkId);

router.route('/tours').get(getTours).post(postTour);
router.route('/tours/:id').get(getTour).patch(updateTour);

module.exports = router;