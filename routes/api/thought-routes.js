const router = require('express').Router();
const { getAllThoughts, getThoughtById, addThought, updateThought, deleteThought } = require('../../controllers/thought-controller');

// api/thoughts/
router.route('/')
    .post(addThought)
    .get(getAllThoughts);

router.route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

module.exports = router;