module.exports = function () {
    if (!process.env.DATABASE_URL) {
        throw new Error('DB url not found.')
    }
    else {
        console.log('Config working fine.')
    }
}