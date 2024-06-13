const { Thought, User } = require('../models');

module.exports = {
    //get all users
    async getAllUser(req, res){
        try{
            const dbUserData = await User.find();
            return res.json(dbUserData);
        } catch(err){
            console.log(err);
            return res.status(404).json(err);
        }
    },
    //get one user by id
    async getUserById(req, res){
        try{
            const dbUserData = await User.findOne({ _id: req.params.id})
            .populate('friends')
            .populate('thoughts')
            if(!dbUserData){
                res.status(404).json({ message: 'No user found with that id.'});
                return;
            }
            res.json(dbUserData);
        } catch(err){
            res.status(404).json(err);
        }
    },
    //create a new user
    async createUser(req, res){
        try{
        const dbUserData = await User.create(req.body);
        res.json(dbUserData);
        } catch (err){
        res.status(404).json(err);
        } 
    },
    //update a specific user by id
    async updateUser(req, res){
        try{
        const dbUserData = await User.findOneAndUpdate({ _id: req.params.id}, body, { new: true, runValidators: true});
            if(!dbUserData){
                res.status(404).json({ message: 'No user found with that id.'});
                return;
            }
            res.json(dbUserData);
        } catch(err){
            res.status(404).json(err);
        }
    },
    // delete a user and associated thoughts 
    // async deleteUser(req, res){
    //     try{}
    //     const thoughtData = await Thought.findOneAndUpdate({ _id: req.params.id});
    //     const userData= await User.findOneAndDelete({ userId: params.id})
    //                 .then(dbUserData =>{
    //                     if (!dbUserData){
    //                         res.status(404).json({ message: 'No user found with that id.'});
    //                         return;
    //                     }
    //                     res.json(dbUserData);
    //                 });
    //         })
    //         .catch(err => res.json(err));
    // },
    async addFriend(req, res){
        try{
        const dbUserData= await User.findOneAndUpdate(
            { _id: params.userId},
            { $push: { friends: req.params.friendId}},
            { runValidators: true},
            { new: true}
        )
        if (!dbUserData){
            res.status(404).json({ message: 'No user found with that id.'});
            return;
        }
        res.json(dbUserData);
        } catch(err) {
        res.status(400).json(err);    
        }
    },
    async deleteFriend(req, res){
        try{
        const dbUserData = await User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: req.params.friendId}},
            { runValidators: true},
            { new: true}
        )
        if(!dbUserData){
            res.status(404).json({ message: 'No user found with that id.'})
            return;
        }
        res.json(dbUserData);
    } catch(err){
        res.status(400).json(err)
    }
}
};
