const path = require('path') 
const http = require('http') 
const express = require('express')
const socketIO = require('socket.io')
const { generateMessage, generateLocationMessage } = require('./utils/message')
const {isRealString} = require('./utils/validation')
const {Users} = require('./utils/users')

const publicPath = path.join(__dirname, '../public') // Setup relative path

const app = express() // Call express
app.use(express.static(publicPath)) // Set express server to serve the public path

const server = http.createServer(app) // Initiate express server
const port = process.env.PORT || 3000 // Check if there is enviroment port or setup port 3000
const io = socketIO(server) // Call socket io with the express server
const users = new Users()

io.on('connection', (socket)=>{ // Check if user connected
    console.log('New user connected') 

    socket.on('join', (params, callback)=>{
        if (!isRealString(params.name) || !isRealString(params.room)){
            return callback('Name and room name are required')
        }

        // Join to relevant socket
        socket.join(params.room)

        // Remove user from previous rooms
        users.removeUser(socket.id)

        // Add user to the room list
        users.addUser(socket.id, params.name, params.room)

        
        io.to(params.room).emit('updateUserList', users.getUserList(params.room))

        // Welcome message for new user
        socket.emit('newMessage', generateMessage('Admin', `Welcome to ${params.room} room`))

        // Alert message new user joined
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} joined the room`))

        callback()

        socket.on('disconnect', ()=>{ // Check if user dissconected
            // Remove user from previous rooms
            const user = users.removeUser(socket.id)

            if(user) {
                io.to(user.room).emit('updateUserList', users.getUserList(user.room))
                io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`))
            }
        })
    })


    // Listening to new message emit from client side
    socket.on('sendMessage', (message, callback)=>{
        const user = users.getUser(socket.id)

        if(user && isRealString(message.text)){
            // Emiting the message to all users
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text))
        }
        callback()
    })

    socket.on('createLocationMessage', (coords)=>{
        const user = users.getUser(socket.id)

        if(user){
            // Emiting the message to all users
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude))
        }
    })
})

server.listen(port, ()=>{ // Connect server on the relevant port
    console.log(`Started on port ${port}`)
})