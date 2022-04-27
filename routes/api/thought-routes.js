const router = require('express').Router();
const { getAllThoughts, 
        getThoughtById, 
        addThought, 
        updateThought, 
        deleteThought,
        addReaction,
        deleteReaction } = require('../../controllers/thought-controller');

// api/thoughts/
router.route('/')
    .post(addThought)
    .get(getAllThoughts);

router.route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

router.route('/:thoughtId/reactions')
    .post(addReaction);

router.route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);

module.exports = router;