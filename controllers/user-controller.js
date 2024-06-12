const { User, Thought } = require('../models');

const userController = {
    //get all users
    getAllUser(req, res){
        User.find({})
            .select('-__v')
            .sort({ _id: -1})
            .then(dbUserData => res.json(dbUserData))
            .catch(err =>{
                console.log(err);
                res.sendStatus(400);
            });
    },
    //get one user by id
    getUserById({ params}, res){
        User.findOne({ _id: params.id})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .then(dbUserData => {
                if (!dbUserData){
                    res.status(404).json({ message: 'No user found with that id.'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },
    //create a new user
    createUser({ body}, res){
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    },
    //update a specific user by id
    updateUser({ params, body}, res){
        User.findOneAndUpdate({ _id: params.id}, body, { new: true, runValidators: true})
            .then(dbUserData => {
                if(!dbUserData){
                    res.status(404).json({ message: 'No user found with that id.'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },
    // delete a user and associated thoughts 
    deleteUser({ params, body}, res){
        Thought.deleteMany({ userId: params.id})
            .then(()=>{
                User.findOneAndDelete({ userId: params.id})
                    .then(dbUserData =>{
                        if (!dbUserData){
                            res.status(404).json({ message: 'No user found with that id.'});
                            return;
                        }
                        res.json(dbUserData);
                    });
            })
            .catch(err => res.json(err));
    },
    addFriend({ params}, res){
        User.findOneAndUpdate(
            { _id: params.userId},
            { $push: { friends: params.friendId}},
            { new: true}
        )
        .then((dbUserData) => {
            if (!dbUserData){
                res.status(404).json({ message: 'No user found with that id.'});
                return;
            }
            res.json(dbUserData);
        })
        .catch((err)=> res.status(400).json(err));
    },
    deleteFriend({ params}, res){
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId}},
            { new: true}
        )
        .then((dbUserData) =>{
            if (!dbUserData){
                res.status(404).json({ message: 'No user found with that id.'});
                return;
            }
            res.json(dbUserData);
        })
        .catch((err)=> res.status(400).json(err));
    }
};

//export module
module.exports = userController;