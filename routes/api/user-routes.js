const router = require('express').Router();

const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../..controllers/user-controller');

//route to get all users and post
router.route('/').get(getAllUser).post(createUser);

//route to get specific user
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

//route to add or delete friends
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

//export router
module.exports = router;