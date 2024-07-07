const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/user-controller');

//route to get all users and post
router.route('/').get(getUsers).post(createUser);

//route to get specific user
router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser);

//route to add or delete friends
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

//export router
module.exports = router;