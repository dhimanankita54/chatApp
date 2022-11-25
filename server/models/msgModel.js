const mongoose = require('mongoose');

const msgSchema = new mongoose.Schema({
    message: {
        text: {
            type: String,
            required: true
        }
    },
    users: Array,
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
},
    {
        timeStamps: true
    }
)

module.exports = mongoose.model("Messages", msgSchema);