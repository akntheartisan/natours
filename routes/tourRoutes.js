const express = require('express');
const router =  express.Router();

const {getTours,postTour,getTour,checkId} = require('../controller/tourController');

router.param('id',checkId);

router.route('/tours').get(getTours).post(postTour);
router.route('/tours/:id').get(getTour);

module.exports = router;