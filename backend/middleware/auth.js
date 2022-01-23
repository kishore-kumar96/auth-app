const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    const authHeader = req.header('Authorization')
    if (!authHeader) return res.status(401).send({ message: 'Access denied, No token provided' })
    const tokenSplit = authHeader && authHeader.split(' ')
    const tokenBearer = tokenSplit[0]
    const token = tokenSplit[1]
    if (tokenBearer === 'Bearer') {
        if (!token) return res.status(401).send({ message: 'Access denied, No token provided' })
        try {
            const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
            req.user = decoded
            next();
        } catch (ex) {
            if (ex.message === "jwt expired") {
                return res.status(403).send({ message: "Authorization token expired" })
            }
            return res.status(400).send({ message: "Invalid Token" })
        }
    } else {
        return res.status(400).send({ message: "Invalid Token" })
    }
}