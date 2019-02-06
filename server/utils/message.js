const generateMessage = (from, text) => {
    return {
        from, 
        text,
        createaAt: new Date().getTime()
    }
}

module.exports = {generateMessage}