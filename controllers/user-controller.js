const { User } = require('../models');

module.exports = {
    //get all users
    async getUsers(req, res){
        try{
            const users = await User.find();
            return res.json(users);
        } catch(err){
            console.log(err);
            return res.status(404).json(err);
        }
    },
    //get one user by id
    async getSingleUser(req, res){
        try{
            const user = await User.findOne({ _id: req.params.userId})
            .select('-__v');

            if(!user){
                res.status(404).json({ message: 'No user found with that id.'});
                return;
            }
            res.json(user);
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
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId},
            { $set: req.body},  
            { new: true}, 
            {runValidators: true}
        );
            
            if(!user){
                return res.status(404).json({ message: 'No user found with that id.'});
            }
            res.json(user);
        } catch(err){
            res.status(404).json(err);
        }
    },
    async addFriend(req, res){
        try{
        const{ userId} = req.params;
        const{ friendId} = req.body;
        const user= await User.findOneAndUpdate(
            { _id: userId},
            { $addToSet: { friends: friendId}},
            { runValidators: true},
            { new: true}
        )
        if (!user){
            res.status(404).json({ message: 'No user found with that id.'});
            return;
        }
        res.json(user);
        } catch(err) {
            res.status(400).json(err);    
        }
    },
    async deleteUser(req, res){
        try{
            const user = await User.findOneAndRemove({ _id: req.params.userId});

            if (!user){
                return res.status(404).json({ message: "no user found with that ID!"});
            }

            res.json({ message: 'friend deleted', user});
        } catch (err){
            res.status(500).json(err);
        }
    },
    async deleteFriend(req, res){
        try{
        const { userId, friendId} = req.params;

        const user = await User.findOneAndUpdate(
            { _id: userId },
            { $pull: { friends: friendId}},
            { runValidators: true},
            { new: true}
        )
        if(!user){
            res.status(404).json({ message: 'No user found with that id.'})
            return;
        }
        res.json(user);
    } catch(err){
        res.status(400).json(err)
    }
}
};
