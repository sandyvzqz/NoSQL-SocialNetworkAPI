const { Schema, model } = require('mongoose');

const userSchema = new Schema({
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getter: true 
        },
        id: false
    }
);

userSchema.virtual('friendCount').get(function(){
    return this.friends.length;
});

//compile our schema into a User model
const User = model('User', userSchema);

//export the User model
module.exports = User;