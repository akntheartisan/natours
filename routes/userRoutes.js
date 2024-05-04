const express = require('express');
const router =  express.Router();

router.route('/').get(getUsers).post(postUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;