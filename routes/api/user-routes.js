const router = require('express').Router();
const { createUser, 
        getAllUsers, 
        getUserById, 
        updateUser, 
        deleteUser,
        addFriend,
        deleteFriend } = require('../../controllers/user-controller');

// api/users/
router.route('/')
    .post(createUser)
    .get(getAllUsers);

router.route('/:id')
    .put(updateUser)
    .delete(deleteUser)
    .get(getUserById);

router.route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router;