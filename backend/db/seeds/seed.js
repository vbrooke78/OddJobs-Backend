const Jobs = require('../../models/jobs.models.js');
const User = require('../../models/users.models.js');
const Messages = require('../../models/messages.models.js');

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