const router = require('express').Router();

const {
    createThought,
    getAllThought,
    getThoughtById,
    updateThought,
    addReaction,
    removeThought,
    removeReaction,
} = require('../../controllers/thought-controller')

router
.route('/')
.get(getAllThought)

router
.route('/:userId')
.post(createThought)

router
.route('/:thoughtId')
.get(getThoughtById)
.put(updateThought)
.delete(removeThought)

router
.route('/:thoughtId/reaction/:userId')
.post(addReaction)

router
.route('/:thoughtId/reactions/reactionId')
.delete(removeReaction)

module.exports = router;