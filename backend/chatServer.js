const http = require('http');
const handler = require('serve-handler');
const { Server } = require('socket.io');
const cors = require('cors');
const app = express();

app.use(cors());


exports.start = (server) => {

    //  const users = {};
    //      const port =  5000;

    // const server = http.createServer(app);

    // const io = new Server(server, {
    //     cors: {
    //         origin: "*"
    //     },
    // });

    // const server = app
    //     .use((req, res) => res.sendFile('/index.html', { root: __dirname }))
    //     .listen(port, () => console.log(`Listening on ${port}`));

    // const io = new Server(server, {
    //     cors: {
    //         origin: "*"
    //     },
    // });

    // io.on('connection', async (socket) => {

    //     console.log(`Someone connected at ${socket.id}` );

    //     socket.emit('someone-connected', "someone connected");

    //     socket.on('user-info', (info) => {

    //         users[info.user] = socket.id;
    //         console.log(`${info.user} has connected with id ${socket.id}`);
    //     })

    //     socket.on('disconnect', () => {

    //         for (const user in users){
    //             if (users[user] === socket.id){
    //                 console.log(`${users[user]} disconnected.`);
    //                 delete users[user];
    //             }
    //         }    
    //     });

    //     socket.on('send', (info) => {

    //         if (!users[info.to]) //user is offline, no need to send live notification
    //             return;

    //         const recieverSocket = users[info.to];
    //         io.to(recieverSocket).emit('notification', info.from);
    //     });
    // });



    
   // server.listen(port, () => console.log(`Server running at http://localhost:${port}`));

            
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

     //   setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
}
