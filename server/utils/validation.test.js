const expect = require('expect')
const {isRealString} = require('./validation')

describe('isRealString', ()=>{
    it('should reject non-string values', ()=>{
        const checkStr = isRealString(1111)
        expect(checkStr).toBe(false)
    })

    it('should reject only spaces', ()=>{
        const checkStr = isRealString('    ')
        expect(checkStr).toBe(false)
    })

    it('should allow string with non-space characters', ()=>{
        const checkStr = isRealString('Hello world')
        expect(checkStr).toBe(true)
    })
})