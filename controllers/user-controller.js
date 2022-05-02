const User = require('../models/User');
const thought = require('../models/Thought');

const userController = {
    createUser({ body }, res) {
        const user = new User(body)
        User.create(user)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    },
    getAllUser(req, res) {
        User.find({})
        .select('-__v')
        .populate([
            { path: 'thoughts', select:['-__v', '-user'] },
            { path: 'friends', select:['-__v', '-thoughts']}
        ])
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
    },
    getUser({ params }, res) {
        User.findOne({ _id: params.id })
        .select('-__v')
        .populate([
            { path: 'thoughts', select:['-__v', '-user'] },
            { path: 'friends', select: ['-__v', '-thoughts']}
        ])
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        })
    },
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
    },
    deleteUser({ params }, res) {
        User.findById({ _id: params.id })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this id'});
                return;
            }
            return dbUserData.thoughts.forEach( async thought => {
                await Thought.findByIdAndDelete(thought)
            })
        })
        .then(() => User.findOneAndDelete({_id: params.id }))
        .then(dbUserData => res.json({message: `The User: ${dbUserData.username} has been deleted`}))
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
    },
    addFriend({ params }, res) {
        User.findOneAndUpdate({_id: params.userId}, {$pull: { friends: params.friendId } }, {new: true})
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            res.sendStatus(500)
        });
    }
}

module.exports = userController