const router = require('express').Router();
const {
    getAllUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/user-controller')

router
.route('/')
.post(createUser)
.get(getAllUsers)

router
.route('/:id')
.get(getUser)
.put(updateUser)
.delete(deleteUser)

router
.route('/:userId/friends/:friendId')
.put(addFriend)
.delete(removeFriend)

module.exports = router;