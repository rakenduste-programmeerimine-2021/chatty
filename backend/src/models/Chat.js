const { Schema, model } = require('mongoose')

const chatSchema = new Schema({
    sender: { type: String, required: true },
    receiver: { type: String, required: true},
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Chat = model("Chat", chatSchema)

module.exports = Chat