const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction,
} = require('../../controllers/thought-controller');

// route to get and post all thoughts
router.route('/').get(getThoughts).post(createThought);

//route for specified thought
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

//route to post reaction
router.route('/:thoughtId/reactions').post(createReaction);

//route to delete reaction
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

//export the router
module.exports = router;
