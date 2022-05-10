const http = require('http');
const handler = require('serve-handler');
const { Server } = require('socket.io');
const cors = require('cors');
const app = express();

app.use(cors());


exports.start = (server) => {

        const users = {};
        const privateChat = {};
            
        const socketIO = require('socket.io');

        const io = socketIO(server, { cors: {
            origin: "*",
        }});

        // io.on('connection', (socket) => {
        // console.log('Client connected');
        // socket.on('disconnect', () => console.log('Client disconnected'));
        // });

        io.on('connection', async (socket) => {

        console.log(`Someone connected at ${socket.id}` );

        socket.emit('someone-connected', "someone connected");

        socket.on('user-info', (info) => {

            users[info.user] = socket.id;
            console.log(`${info.user} has connected with id ${socket.id}`);
        });

        socket.on('disconnect', () => {

            for (const user in users){
                if (users[user] === socket.id){

                    delete users[user];

                    if(privateChat[user])
                        delete privateChat[user];

                    console.log(`${users[user]} disconnected.`);
                }
            }    
        });

        socket.on('join-private-chat', (info) => {

            privateChat[info.user] = true;
            console.log(`${info.user} has joined private chat`);
        });

        socket.on('leave-private-chat', (info) => {

            delete privateChat[info.user];
            console.log(`${info.user} has left private chat`);
        })

        socket.on('send', (info) => {

            console.log(`incoming message for ${info.to}`)
            if (!users[info.to]) //user is offline, no need to send live notification
                return;

            const recieverSocket = users[info.to];
            console.log(`sending message to ${info.to} at ${recieverSocket}`);

            if (privateChat[info.to]){ // in private chat, don't send notification
                io.to(recieverSocket).emit('update-private-message', info);
            }
            else {
                io.to(recieverSocket).emit('notification', info);
                io.to(recieverSocket).emit('update-chatlog', info);
            }
        });
    });

}
