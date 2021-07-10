const app = require('express')();
const server = require('http').createServer(app);
const cors = require('cors');

const io = require('socket.io')(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

app.use(cors());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Server is running.');
});

// io function used to reflect connection to specific socket
io.on('connection', (socket) => {

    // Going to give us our own id when connect to socket
    socket.emit('me', socket.id);

    // When call disconnects user will see an ended message
    socket.on('disconnect', () => {
        socket.broadcast.emit('callended');
    });

    // Getting info from user when called
    socket.on('calluser', ({userToCall, signalData, from, name}) => {
        io.to(userToCall).emit('calluser', {signal: signalData, from, name});
    });

    // Retrieve Signal when call is accepted from user
    socket.on('answercall', (data) => {
        io.to(data.to).emit('callaccepted', data.signal);
    })
});

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));