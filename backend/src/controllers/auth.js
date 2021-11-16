const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

exports.login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })

    if (!user) throw Error("E-mail või parool on vale!")

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) throw Error("E-mail või parool on vale!")

    const userTemplate = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    }

    const token = jwt.sign(userTemplate, process.env.JWT_SECRET)
    if (!token) throw Error("Something critical happened: FAIL 35")

    res.status(200).json({
      token,
      ...userTemplate
    })

  } catch (e){
    res.status(400).json({ error: e.message })
  }
}

exports.signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body

  try {
    const user = await User.findOne({ email })

    if (user) throw Error("Sellise e-mailiga on juba kasutaja loodud!")

    const salt = await bcrypt.genSalt(10)
    if (!salt) throw Error("Something critical happened: FAIL 12")

    const hash = await bcrypt.hash(password, salt)
    if (!hash) throw Error("Something critical happened: FAIL 67")

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hash
    })

    const savedUser = await newUser.save()
    if (!savedUser) throw Error("Kasutaja salvestamisel tekkis viga!")

    res.status(200).json({ message: "Kasutaja edukalt loodud!" })
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
}