const mongoose = require('mongoose')

module.exports = async function () {
    const db = process.env.DATABASE_URL
    await mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
        .then(() => console.log(`Connected to DB`))
        .catch(() => { throw new Error('Error while connecting to DB') })
}
