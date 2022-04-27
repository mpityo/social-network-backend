const router = require('express').Router();
const { createUser, getAllUsers, getUserById, updateUser, deleteUser } = require('../../controllers/user-controller');

// api/users/
router.route('/')
    .post(createUser)
    .get(getAllUsers);

// api/users/:userId
router.route('/:id')
    .put(updateUser)
    .delete(deleteUser)
    .get(getUserById);

module.exports = router;