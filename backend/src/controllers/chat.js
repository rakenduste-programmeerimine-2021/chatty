const Chat = require("../models/Chat")

exports.sendChat = async (req, res) => {
    const { sender, receiver, message } = req.body

    try {
        const newChat = new Chat({
            sender,
            receiver,
            message
        })
    
        const savedChat = await newChat.save()
        if(!savedChat) throw Error("Sõnumi saatmisel tekkis viga!")

        res.status(200).json({ message: "Sõnum saadetud!" })
    } catch (e) {
        res.status(400).json({ error: e.message })
    }
}

exports.receiveChats = async (req, res) => {
    const { ID1, ID2 } = req.body

    try {
        const result1 = await Chat.find({ "sender": ID1, "receiver": ID2 })
        const result2 = await Chat.find({ "sender": ID2, "receiver": ID1 })

        if(!result1) throw Error("Sinu saadetud sõnumeid ei leitud")
        if(!result2) throw Error("Sinule saadetud sõnumeid ei leitud")

        res.status(200).json({
            result1,
            result2
        })
    } catch (e) {
        res.status(400).json({ error: e.message })
    }
}