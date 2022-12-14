require('dotenv').config();
const express = require('express');
const { Server } = require('socket.io');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const msgRoutes = require('./routes/msgRoutes');
const socket = require('socket.io');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/auth', userRoutes);
app.use('/api/messages', msgRoutes);

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('DB Connected')
}).catch((err) => {
    console.log(err.message)
})

const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
    console.log(`listening to ${PORT}`)
});


const io = socket(server, {
    cors: {
        origin: 'http://localhost:3000',
        credentials: true
    }
})

global.onlineUsers = new Map();

io.on('connection', (socket) => {
    global.chatSocket = socket;
    socket.on('add-user', (userId) => {
        onlineUsers.set(userId, socket.id)
    });

    socket.on('send-msg', (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit('msg-receive', data.message)
        }
    })
})

