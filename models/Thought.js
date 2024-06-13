const { Schema, model, Types} = require('mongoose');
const moment = require('moment');

const ThoughtSchema = new Schema({
    thoughtText:{
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format('MMM Do, YY')
    }
},
    {
       username:{
        type: String,
        required: true
       },
       reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    },
);

ThoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});

//compile our schema into a Thought model
const Thought = model('Thought', ThoughtSchema);

//export the Thought model
module.exports = Thought;