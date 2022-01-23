const moment = require("moment-timezone")

exports.setTimeZoneToGMT = (type, timeStamp) => {
    if (type === "new") {
        return moment().tz('Asia/Kolkata').valueOf();
    } else {
        return moment(timeStamp).tz('Asia/Kolkata').valueOf();
    }
}