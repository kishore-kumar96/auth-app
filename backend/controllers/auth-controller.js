const Joi = require('joi')
const { User } = require('../models/user')
const bcrypt = require('bcrypt')
const asyncMiddleware = require("../middleware/async")

// validate user login in
function validate(req) {
    const schema = {
        email: Joi.string().max(255).required().email(),
        password: Joi.string().max(255).required()
    };

    return Joi.validate(req, schema);
}

// login api
exports.login = asyncMiddleware(async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    let user = await User.findOne({ email: req.body.email.toLowerCase() })
    if (!user) res.status(400).send({ message: 'Please enter valid email or password.' });

    const isValidPassword = await bcrypt.compare(req.body.password, user.password)
    if (!isValidPassword) return res.status(400).send({ message: 'Please enter valid email or password.' })

    const access_token = await user.generateAuthToken()
    await res.send({ user: { id: user._id, email: user.email, name: user.name, createdDate: user.createdDate }, access_token, message: "User Login successfully!" })
    await user.save()
})