const expect = require('expect')
const {Users} = require('./users')

describe('Users Class', ()=>{
    let users

    beforeEach(()=>{
        users = new Users()
        users.users = [{
            id: '1',
            name: 'Gil',
            room: 'Room 1'
        },{
            id: '2',
            name: 'tal',
            room: 'Room 2'
        },{
            id: '3',
            name: 'Valia',
            room: 'Room 1'
        }]
    })

    it('Should add new user', ()=>{
        const users = new Users()
        const user = {
            id: '123',
            name: 'Gil',
            room: 'Test'
        }
        const resUser = users.addUser(user.id, user.name, user.room)
        expect(users.users).toEqual([resUser])
    })

    it('Should return names for Room 1', ()=>{
        const userList = users.getUserList('Room 1')
        expect(userList).toEqual([users.users[0].name, users.users[2].name])
    })

    it('Should return names for Room 2', ()=>{
        const userList = users.getUserList('Room 2')
        expect(userList).toEqual([users.users[1].name])
    })

    it('Should remove user', ()=>{
        users.removeUser('2')
        expect(users.users.length).toBe(2)
    })

    it('Should not remove user', ()=>{
        users.removeUser('4')
        expect(users.users.length).toBe(3)
    })

    it('Should find user', ()=>{
        const findUser = users.getUser('2')
        expect(findUser).toEqual(users.users[1])
    })

    it('Should not find user', ()=>{
        const findUser = users.getUser('4')
        expect(findUser).toEqual(undefined)
    })
})