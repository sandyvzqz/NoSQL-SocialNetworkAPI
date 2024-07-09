const { Thought, User } = require('../models');

module.exports = {
    //gets all thoughts
    async getThoughts(req, res){
        try{ 
        const thoughts = await Thought.find()
            res.json(thoughts)
        } catch(err) {
            res.sendStatus(400).json(err);
        }
    },
    //get specific thought by ID
    async getSingleThought(req, res){
        try{
        const singleThought = await Thought.findOne({ _id: req.params.thoughtId });
        if(!singleThought){
            res.status(404).json({ message: 'No thought found with that id.'});
            return;
        }
        res.json(singleThought)
        } catch(err) {
            res.sendStatus(400).json(err);
        };
    },
    //create a thought
    async createThought(req, res){
        try{
        const newThought = await Thought.create(req.body);
        const user = await User.findOneAndUpdate (
            { _id: req.body.userId},
            { $addToSet: { thoughts: newThought._id}},
            { new: true}
        )
        if (!user){
            return res.status(404).json({message: "No user found with that ID!"});
        }

        res.json('Created new thought.');
        } catch(err){
            res.status(404).json(err);
        }
    },
    //update specific thought by ID
    async updateThought(req, res){
        try{
        const updateThought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId},
            { $set: req.body},
            { new: true},
            { runValidators: true});
                if(!updateThought){
                    res.status(404).json({ message: 'No thought found with that id.'});
                    return;
                }
                res.json(updateThought);
            } catch(err){
                res.status(400).json(err);
            } 
    },
    // delete a specific thought by id
    async deleteThought(req, res){
        try{
        const thoughtId = req.params.thoughtId;
        if (!thoughtId.match(/^[0-9a-fA-F]{24}$/)){
            return res.status(400).json({ message: "Invalid thought ID"});
        }
        const deleteThought = await Thought.findOneAndDelete({ _id: thoughtId });
            
        if (!deleteThought){
                return res.status(404).json({ message: 'No thought found with that id.'});
            }
        // find user and update the thought
        const user = await User.findOneAndUpdate(
            { thoughts: thoughtId },
            { $pull: { thoughts: thoughtId}},
            { new: true}
        );

        if(!user){
            return res.status(404).json({message: "No user found with that ID!"});
        }
        res.json({ message: "Thought deleted successfully!"})
            
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: "Bad request", error: err.message});
        }
    },
    // create a reaction or update existing
    async createReaction(req, res){
        try{
        const newReaction = req.body;
        const addReaction = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: newReaction}},
            { new: true, runValidators: true}
        );

        if(!addReaction){
            return res.status(404).json({ message: 'No thought found with that ID!'});
        }

        res.json(addReaction);
        
    } catch(err) {
        res.status(404).json(err)
        }
    },
    // delete a reaction
    async deleteReaction(req, res){
        try{
        const deleteReaction = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId}}},
            { new: true, runValidators: true}
        )
        if(!deleteReaction){
            res.status(404).json({ message: 'Error deleting reaction.'});
            return;
        }
        res.json(deleteReaction);
        } catch(err){
            res.status(404).json(err)
        } 
    }
};
