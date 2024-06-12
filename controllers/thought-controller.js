const { User, Thought} = require('../models');

const thoughtController = {
    //gets all thoughts
    getAllThought(req, res){
        Thought.find({})
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select(-__v)
            .sort({ _id: -1})
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },
    //get specific thought by ID
    getThoughtById({ params }, res){
        Thought.findOne({ _id: params.id })
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1})
            .then(dbThoughtData => {
                if(!dbThoughtData){
                    res.status(404).json({ message: 'No thought found with that id.'});
                    return;
                }
                res.json(dbThoughtData)
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },
    //create a thought
    createThought({ body }, res){
        Thought.create(body)
            .then(({ _id })=>{
                return User.findOneAndUpdate(
                    { _id: body.UserId},
                    { $push: { thoughts: _id}},
                    { new: true}
                );
            })
            .then(dbThoughtData =>{
                if(!dbThoughtData){
                    res.status(404).json({ message: 'No user found with that id. '});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },
    //update specific thought by ID
    updateThought({ params, body}, res){
        Thought.findOneAndUpdate({ _id: params.id}, body, { new: true, runValidators: true})
            .then(dbThoughtData =>{
                if(!dbThoughtData){
                    res.status(404).json({ message: 'No thought found with that id.'});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },
    // delete a specific thought by id
    deleteThought({ params }, res){
        Thought.findOneAndDelete({ _id: params.id})
            .then(dbThoughtData =>{
                if (!dbThoughtData){
                    res.status(404).json({ message: 'No thought found with that id.'});
                    return;
                }
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $pull: { thoughts: params.Id}},
                    { new: true}
                )
            })
            .then(dbUserData =>{
                if (!dbUserData){
                    res.status(404).json({ message: 'No user found with that id.'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },
    // create a reaction or update existing
    createReaction({ params, body}, res){
        Thought.findOneAndUpdate(
            { _id: params.thoughtId},
            { $push: { reactions: body}},
            { new: true, runValidators: true}
        )
        .populate({ path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(dbThoughtData => {
            if (!dbThoughtData){
                res.status(404).json({ message: 'No thought found with that id.'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err))
    },
    // delete a reaction
    deleteReaction({ params }, res){
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId}}},
            { new: true}
        )
        .then(dbThoughtData => {
            if(!dbThoughtData){
                res.status(404).json({ message: 'Error deleting reaction.'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    }
};

//export the module
module.exports = thoughtController;