const http = require('http');
const handler = require('serve-handler');
const { Server } = require('socket.io');
const cors = require('cors');
const app = express();

app.use(cors());


exports.start = () => {

    const users = {};

    const server = http.createServer(app);

    const io = new Server(server, {
        cors: {
            origin: "*:*"
        },
    });

    io.on('connection', async (socket) => {

        console.log(`Someone connected at ${socket.id}` );

        socket.emit('someone-connected', "someone connected");

        socket.on('user-info', (info) => {

            users[info.user] = socket.id;
            console.log(`${info.user} has connected with id ${socket.id}`);
        })

        socket.on('disconnect', () => {

            for (const user in users){
                if (users[user] === socket.id){
                    console.log(`${users[user]} disconnected.`);
                    delete users[user];
                }
            }    
        });

        socket.on('send', (info) => {

            if (!users[info.to]) //user is offline, no need to send live notification
                return;

            const recieverSocket = users[info.to];
            io.to(recieverSocket).emit('notification', info.from);
        });
    });

    const port = process.env.SOCKET_PORT || 8081;
    server.listen(port, () => console.log(`Server running at http://localhost:${port}`));
}
