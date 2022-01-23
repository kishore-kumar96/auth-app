const apiVersion = require('../staticDB/apiVersion.json')
const auth = require("../routes/auth-route")
const user = require("../routes/user-route")
module.exports = function (app) {
    app.get('/', (req, res) => {
        return res.send(`Welcome to middleware APIs v: ${apiVersion.apiVersion}`)
    })

    app.use('/api/login', auth)
    app.use('/api/users', user)

    app.use('*', (req, res) => {
        return res.status(404).send({ message: "The route you are looking for doesn't exist." })
    })
}
