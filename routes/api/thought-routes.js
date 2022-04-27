const router = require('express').Router();
const { addThought } = require('../../controllers/thought-controller');

// api/thoughts/
router.route('/:userId')
    .post(addThought);

module.exports = router;