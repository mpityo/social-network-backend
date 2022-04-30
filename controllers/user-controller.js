const { User, Thought } = require('../models');

const userController = {
    // create a new user
    createUser({ body }, res) {
        User.create(body)
         .then((dbUserData) => res.json(dbUserData))
         .catch((err) => {
             console.log(err);
             res.status(400).json(err);
         });
    },

    // get all users
    getAllUsers(req, res) {
        User.find({})
         .select("-__v")
         .then(dbUserData => res.json(dbUserData))
         .catch(err => {
             console.log(err);
             res.status(400).json(err);
         });
    },

    // get one user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
         .populate({
             path: "thoughts",
             select: "-__v"
         })
         .populate({
             path: "friends",
             select: "-__v"
         })
         .select("-__v")
         .then(dbUserData => {
             if (!dbUserData) {
                 res.status(400).json({ message: "No user found with this id" });
                 return;
             }
             res.json(dbUserData);
         })
         .catch(err => {
             console.log(err);
             res.status(400).json(err);
         })
    },

    // update a user by id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true, runValidators: true }
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: "No user found with this id" });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    // delete a user by id
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
         .then(({ username }) => {
            return Thought.deleteMany({ username });
         })
         .then(dbUserData => {
             if (!dbUserData) {
                 res.status(404).json({ message: "No user found with this id" });
                 return;
             }
             res.json(dbUserData);
         })
         .catch(err => res.status(400).json(err));
    },

    // add a friend: adds friend to user friend list and user to friends friend list
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: params.friendId } },
            { new: true, runValidators: true }
        )
        .populate({
            path: 'friends',
            select: "-__v"
        })
        .select('-__v')
        .then(() => {
            return User.findOneAndUpdate(
                { _id: params.friendId },
                { $push: { friends: params.userId } },
                { new: true, runValidators: true }
            )
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(400).json({ message: "No user found with this id" });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(404).json(err);
        });
    },

    // delete friend from both user and friend's friend list (unfriend)
    deleteFriend({ params }, res) {
        User.findByIdAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true, runValidators: true }
        )
        .then(({ _id }) => {
            return User.findByIdAndUpdate(
                { _id: params.friendId },
                { $pull: { friends: _id } },
                { new: true, runValidators: true }
            )
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(400).json({ message: "No user found with this id" });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(404).json(err);
        });
    }

};

module.exports = userController;