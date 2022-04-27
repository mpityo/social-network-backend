const { Thought, User } = require('../models');

const thoughtController = {
    // get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
         .select("-__v")
         .then(dbThoughtData => res.json(dbThoughtData))
         .catch(err => {
             console.log(err);
             res.status(404).json(err);
         });
    },
    
    // get a thought by its id
    getThoughtById({ params }, res) {
        Thought.findById({ _id: params.id })
         .select("-__v")
         .then(dbThoughtData => {
             if (!dbThoughtData) {
                 res.status(400).json({ message: "No thought found with that ID" });
                 return;
             }
             res.json(dbThoughtData);
         })
         .catch(err => {
             console.log(err);
             res.status(404).json(err);
         });
    },

    // add thought
    addThought({ body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: _id } },
                    { new: true, runValidators: true }
                );
            })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No user found with this id' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },

    // update a thought by id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true, runValidators: true }
        )
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: body.userId },
                { $push: { thoughts: _id }},
                { new: true, runValidators: true }
            )
        })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(400).json({ message: "No thought found with this ID" });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(404).json(err);
        });
    },

    // delete thought by id
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
         .then(dbThoughtData => {
             if (!dbThoughtData) {
                res.status(404).json({ message: "No thought found with this ID" });
                return;
              }
              res.json(dbThoughtData);
        })
        .catch((err) => res.status(400).json(err));
    },

    // add a reaction to a thought by thought id
    addReaction({ params, body }, res) {
        Thought.findByIdAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
        .select("-__v")
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(400).json({ message: "No thought found with this id" });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(404).json(err);
        });
    },

    // delete a reaction by thought id and reaction id /thoughts/:thoughtId/reactions/:reactionId
    deleteReaction({ params }, res) {
        Thought.findByIdAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true, runValidators: true }
        )
        .select("-__v")
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(400).json({ message: "No thought found with this id" });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(404).json(err);
        });
    }
};

module.exports = thoughtController;