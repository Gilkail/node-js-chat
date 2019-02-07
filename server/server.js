const path = require('path') 
const http = require('http') 
const express = require('express')
const socketIO = require('socket.io')
const { generateMessage, generateLocationMessage } = require('./utils/message')

const publicPath = path.join(__dirname, '../public') // Setup relative path

const app = express() // Call express
app.use(express.static(publicPath)) // Set express server to serve the public path

const server = http.createServer(app) // Initiate express server
const port = process.env.PORT || 3000 // Check if there is enviroment port or setup port 3000
const io = socketIO(server) // Call socket io with the express server

io.on('connection', (socket)=>{ // Check if user connected
    console.log('New user connected') 
    
    socket.on('disconnect', ()=>{ // Check if user dissconected
        console.log('User dissconected')
    })

    // Welcome message for new user
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat'))

    // Alert message new user joined
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined the room'))

    // Listening to new message emit from client side
    socket.on('sendMessage', (message, callback)=>{
        // Emiting the message to all users
        io.emit('newMessage', generateMessage(message.from, message.text))
        callback('This is from the server')
    })

    socket.on('createLocationMessage', (coords)=>{
        // Emiting the message to all users
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
    })
})

server.listen(port, ()=>{ // Connect server on the relevant port
    console.log(`Started on port ${port}`)
})