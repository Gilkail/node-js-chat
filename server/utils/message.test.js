const expect = require('expect')
const {generateMessage} = require('./message')

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