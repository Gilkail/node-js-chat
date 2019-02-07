const generateMessage = (from, text) => {
    return {
        from, 
        text,
        createaAt: new Date().getTime()
    }
}

const generateLocationMessage = (from, latitude, longitude) => {
    return {
        from, 
        url: `https://www.google.com/maps?q=${latitude},${longitude}`,
        createaAt: new Date().getTime()
    }
}

module.exports = {generateMessage, generateLocationMessage}