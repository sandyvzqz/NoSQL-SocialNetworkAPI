const { Schema, model} = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema({
    thoughtText:{
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: date => date.toLocaleDateString()
    }
},
    {
       username:{
        type: String,
        required: true
       },
       reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    },
);

thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});

//compile our schema into a Thought model
const Thought = model('Thought', thoughtSchema);

//export the Thought model
module.exports = Thought;