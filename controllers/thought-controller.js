const { Thought, User } = require('../models');

const ThoughtController = {

    // add Thought to User
    createThought({ params, body }, res) {
        const thought = new thought(body)
        thought.user = params.userId
        Thought.create(thought)
        .then(dbThoughtData => {
            User.findOneAndUpdate(
                { _id: params.userId },
                {$push: { thoughts: thought._id } },
                { new: true}
            )
            .then(() => { res.json(dbThoughtData)})
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    },

    //get all
    getAllThought(req, res) {
        Thought.find({})
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    // Get by ID
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.thoughtId })
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .then(dbThoughtData=> res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    //update thought
    updateThought({ params, body }, res) {
        thought.findOneAndUpdate({ _id: params.thoughtId }, body, { new: true, runValidators: true })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No Thought found with this id!'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },

    // reaction to thought
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
			{ $push: { reactions: body } },
			{ new: true, runValidators: true }
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'That is not a valid ID!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    //delete
    removeThought({ params }, res) {
        Thought.findByIdAndDelete(
            { _id: params.thoughtId },
		    { new: true, runValidators: true }
        )
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => res.json(err));
    },

    //remove reaction
    removeReaction({ params }, res) {
        Thought.findByIdAndUpdate(
            { _id: params.thoughtId },
			{ $pull: { reactions: { reactionId: params.reactionId } } },
			{ new: true, runValidators: true }
        )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    }
};

module.exports = ThoughtController;