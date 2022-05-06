const http = require('http');
const handler = require('serve-handler');
//const nanobuffer from 'nanobuffer';
const { Server } = require('socket.io');
const cors = require('cors');
const app = express();

app.use(cors());


exports.start = () => {

    const msg = [];
    const users = {};
    const rooms = {};

    const server = http.createServer(app);

    const io = new Server(server, {
        cors: {
            origin: 'http://localhost:3000',
        },
    });

    io.on('connection', async (socket) => {

        console.log(`connected: ${socket.id}`);

        socket.on('join-room', (info) => {

            if (!users[info.user])
                users[info.user] = [];
            
                users[info.user].push(socket.id);
            
            if (!rooms[info.chatRoom])
                rooms[info.chatRoom] = [];
        
            rooms[info.chatRoom].push(info.user);

            console.log(users, rooms);
        })

        socket.on('disconnect', () => {
            console.log(`disconnect: ${socket.id}`);
        });

        socket.on('msg:post', (data) => {

            console.log(data);
        
            rooms[data.room].forEach(user =>
                io.to(users[user]).emit('msg:get', {room: data.room, msg: `${data.user}: ${data.newMessage}`}));
        });
    });

    const port = process.env.SOCKET_PORT || 8081;
    server.listen(port, () => console.log(`Server running at http://localhost:${port}`));
}
