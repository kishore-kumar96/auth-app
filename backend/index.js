const express = require('express');
const app = express();


(async () => {
    try {
        require('dotenv').config();
        require('./startup/config')()
        require('./startup/middleware')(app)
        await require('./startup/db')()
        require('./startup/routes')(app)

    } catch (ex) {
        console.log(ex.message, 'error in index.js')
    }
})()
const PORT = process.env.PORT || 3013;
app.listen(PORT, () => console.log(`Listening to PORT ${PORT}`))