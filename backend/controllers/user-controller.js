
const { User } = require('../models/user')
const { validate } = require('../models/user')
const bcrypt = require('bcrypt')
const { setTimeZoneToGMT } = require('../common/utils')
const asyncMiddleware = require("../middleware/async")

// create user
exports.createUser = asyncMiddleware(async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    let user = undefined;
    user = await User.findOne({ email: String(req.body.email).toLowerCase() })
    if (user) return res.status(400).send({ message: "User with this email already exists." })

    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(req.body.password, salt);

    user = new User({
        email: String(req.body.email).toLowerCase(),
        name: String(req.body.name),
        phone: req.body.phone,
        password,
        createdDate: setTimeZoneToGMT('new'),
    })

    await user.save()
    return res.status(201).send({ message: "User added successfully!" })

})

//Get user by id
exports.getUser = asyncMiddleware(async (req, res) => {
    const id = req.params.id || ""
    let user = await User.findOne({ _id: id })
    if (!user) return res.status(404).send({ message: "User doesn't exit!" })
    return res.status(200).send({ user: { id: user._id, name: user.name, email: user.email, phone: user.phone, createdDate: user.createdDate }, message: "Get user successfully!" })
})
