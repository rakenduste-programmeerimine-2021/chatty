const User = require("../models/User")
const Chat = require("../models/Chat")

exports.searchUser = async (req, res) => {
    const { bothNames } = req.body

    try {
        const result = await User.find({ "bothNames": { "$regex": bothNames, "$options": "i"} })

        if(!result) throw Error("Ühtegi kasutajat ei leitud! :(")

        res.status(200).json({
            result
        })
    } catch (e) {
        res.status(400).json({ error: e.message })
    }
}

exports.searchRecentChats = async (req, res) => {
    const { userID } = req.body

    try {
        const result1 = await Chat.find({ "sender": userID })
        const result2 = await Chat.find({ "receiver": userID })

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

exports.searchUsersByIDs = async (req, res) => {
    const { IDs } = req.body

    var returnData = [];

    try {
        for(let i = 0; i < IDs.length; i++) {
            const result = await User.find({ "_id": IDs[i] })

            if(!result) throw Error("Ühtegi kasutajat ei leitud! :(")

            returnData.push(result[0].bothNames);
        }

        res.status(200).json({
            returnData
        })
    } catch (e) {
        res.status(400).json({ error: e.message })
    }
}