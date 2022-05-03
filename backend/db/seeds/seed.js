const Jobs = require('../../schemas/jobs.schema.js');
const User = require('../../schemas/users.schema.js');
const Messages = require('../../schemas/messages.schema.js');

async function seed({messagesData, jobsData, usersData}) {

    try {
        await Jobs.deleteMany({});
        await User.deleteMany({});
        await Messages.deleteMany({});

        await Jobs.insertMany(jobsData);
        await User.insertMany(usersData);
        await Messages.insertMany(messagesData);
    }
    catch(err) {
        console.log(err);
        return Promise.reject(err);
    }
}

module.exports = seed;