const mongoose = require('mongoose')
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const { setTimeZoneToGMT } = require('../common/utils')

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: Number, required: true },
    createdDate: Number,
}, { versionKey: false })

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, email: this.email, created: setTimeZoneToGMT('new') }, process.env.JWT_PRIVATE_KEY, { expiresIn: "2d" });
    return token;
}

const User = mongoose.model('User', userSchema)

function validateUser(reqBody) {
    const schema = {
        name: Joi.string().required(),
        email: Joi.string().required().email().max(255),
        phone: Joi.number().required(),
        password: Joi.string().required()
    }
    return Joi.validate(reqBody, schema)
}


exports.User = User;
exports.validate = validateUser;
