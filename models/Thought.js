const { Schema, model, Types } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdDate: {
            type: Date,
            default: Date.now,
            get: setDate,
        },
    },
    {
        toJSON: {
            getters: true,
        },
        _id: false,
    }
);

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: setDate,
    },
    username: {
        type: String,
        required: true
    },
    reactions: [
        reactionSchema
    ],
}, {
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false,
}
);

function setDate(timestamp) {
    return timestamp.toLocaleString();
}

thoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
