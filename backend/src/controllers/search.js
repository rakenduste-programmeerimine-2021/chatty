const User = require("../models/User")

exports.search = async (req, res) => {
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