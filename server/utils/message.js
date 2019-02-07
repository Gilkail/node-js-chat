const moment = require('moment')


const generateMessage = (from, text) => {
    return {
        from, 
        text,
        createaAt: moment().valueOf()
    }
}

const generateLocationMessage = (from, latitude, longitude) => {
    return {
        from, 
        url: `https://www.google.com/maps?q=${latitude},${longitude}`,
        createaAt: moment().valueOf()
    }
}

module.exports = {generateMessage, generateLocationMessage}