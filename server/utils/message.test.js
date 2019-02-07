const expect = require('expect')
const {generateMessage, generateLocationMessage} = require('./message')

describe('generateMessage', ()=>{
    it('Should render a message', ()=>{

        const message = {
            from: 'Gil',
            text: 'Hello world'
        }

        const getMessage = generateMessage(message.from, message.text)

        expect(getMessage).toMatchObject(message)
        expect(typeof getMessage.createaAt).toBe('number')

    })
})

describe('generateLocationMessage', ()=>{
    it('Should generate correct location object', ()=>{

        const from = 'Admin'
        const latitude = 1
        const longitude = 1
        
        const getLocation = generateLocationMessage(from, latitude, longitude)
        
        expect(getLocation.url).toBe(`https://www.google.com/maps?q=${latitude},${longitude}`)

    })
})