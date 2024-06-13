const { Thought, User } = require('../models');

module.exports = {
    //gets all thoughts
    async getAllThought(req, res){
        try{ 
        const dbThoughtData = await Thought.find({})
            res.json(dbThoughtData)
        } catch(err) {
            res.sendStatus(400).json(err);
        }
    },
    //get specific thought by ID
    async getThoughtById(req, res){
        try{
        const dbThoughtData = await Thought.findOne({ _id: req.params.id });
        if(!dbThoughtData){
            res.status(404).json({ message: 'No thought found with that id.'});
            return;
        }
        res.json(dbThoughtData)
        } catch(err) {
            res.sendStatus(400).json(err);
        };
    },
    //create a thought
    async createThought(req, res){
        try{
        const dbThoughtData = await Thought.create(req.body);
        const userId = req.body.userId;
        const user = await User.findOneAndUpdate (userId,
            { _id: body.UserId},
            { $push: { thoughts: _id}},
            { new: true}
        )
        res.json(dbThoughtData);
        } catch(err){
            res.status(404).json(err);
        }
    },
    //update specific thought by ID
    async updateThought(req, res){
        try{
        const dbThoughtData = await Thought.findOneAndUpdate(
            { _id: req.params.id},
            { $set: req.body},
            { new: true},
            { runValidators: true});
                if(!dbThoughtData){
                    res.status(404).json({ message: 'No thought found with that id.'});
                    return;
                }
                res.json(dbThoughtData);
            } catch(err){
                res.status(400).json(err);
            } 
    },
    // delete a specific thought by id
    async deleteThought(req, res){
        try{
        const dbThoughtData = Thought.findOneAndDelete({ _id: params.id})
            if (!dbThoughtData){
                res.status(404).json({ message: 'No thought found with that id.'});
                return;
            }
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $pull: { thoughts: params.Id}},
                { new: true}
            )
            }catch (err) {
                res.status(400).json(err);
            }
    },
    // create a reaction or update existing
    async createReaction(req, res){
        try{
        const dbThoughtData = await Thought.findOneAndUpdate(
            { _id: params.thoughtId},
            { $push: { reactions: body}},
            { new: true, runValidators: true}
        )
        res.json(dbThoughtData);
        } catch(err) {
        res.status(404).json(err)
        }
    },
    // delete a reaction
    async deleteReaction(req, res){
        try{
        const dbThoughtData = await Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId}}},
            { new: true}
        )
        if(!dbThoughtData){
            res.status(404).json({ message: 'Error deleting reaction.'});
            return;
        }
        res.json(dbThoughtData);
        } catch(err){
            res.status(404).json(err)
        } 
    }
};
