const http = require('http');
const handler = require('serve-handler');
//const nanobuffer from 'nanobuffer';
const { Server } = require('socket.io');

//const msg = new nanobuffer(50);
exports.start = () => {

    const msg = [];
    let count = -1;
    const users = {};


    const getMessages = () => Array.from(msg).reverse();

    msg.push({
    text: 'Start a conversation!',
    user: '🎩',
    time: Date.now(),
    });

    // serve static assets
    const server = http.createServer((request, response) => {
    return handler(request, response, {
        public: './frontend',
    });
    });

    const io = new Server(server, {});

    io.on('connection', async (socket) => {

        console.log(`connected: ${socket.id}`);

        let roomId = `${Math.floor((++count)/2)}`;

        if (!users[roomId])
            users[roomId] = [socket.id];
        else
            users[roomId].push(socket.id);

        console.log(socket.id);
        console.log(users);

        socket.emit('roomId',roomId)
        socket.emit('msg:get', { msg: getMessages() });

        socket.on('disconnect', () => {
            console.log(`disconnect: ${socket.id}`);
        });

        socket.on('msg:post', (data) => {
            msg.push({
            user: data.user,
            text: data.text,
            time: Date.now(),
            });
            // this line is sharing the message to everyone
            // in the end though, we want this line below to
            // be a 'room' for each conversation started, so
            // that dialogue is only between the two
        //  io.emit('msg:get', { msg: getMessages() });
            users[data.roomId].forEach(user =>
                io.to(user).emit('msg:get', { msg: getMessages() }));
        });
    });

    const port = process.env.SOCKET_PORT || 8081;
    server.listen(port, () => console.log(`Server running at http://localhost:${port}`));
}
