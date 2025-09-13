
const UserData = require("../Model/UserModel")
const bcrypt = require('bcrypt')

// Register user adding into DB
const AddingUser = async (req, res) => {

    const hashPass = await bcrypt.hash(req.body.password, 10)
    const encrypted = { ...req.body, password: hashPass }
    const newUser = new UserData(encrypted)

    try {
        const saveUser = await newUser.save()
        res.status(200).send({ message: "User Added Successfully", saveUser })
    }
    catch (err) {
        res.status(500).send({ message: "Can't save the user", err })
    }
}

// find all user in mongoDB
const FindAllUser = async (req, res) => {

    try {
        const AllUser = await UserData.find()
        res.status(200).send(AllUser)
    }
    catch (err) {

        res.status(500)
        res.send({ message: "can't read data", err })
    }
}

// login user
const LogInUser = async (req, res) => {

    const user = {
        userName: req.user.userName,
        email: req.user.email,
        role: req.user.role,
        token:req.token
    }

    res.status(200).send([{ message: "Login successfully" }, user])
}

module.exports = { AddingUser, FindAllUser, LogInUser }