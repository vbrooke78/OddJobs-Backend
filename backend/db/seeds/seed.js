const Jobs = require('../../schemas/jobs.schema.js');
const User = require('../../schemas/users.schema.js');
const Messages = require('../../schemas/messages.schema.js');
const bcrypt = require("bcrypt");

async function seed({messagesData, jobsData, usersData}) {

    try {
        await Jobs.deleteMany({});
        await User.deleteMany({});
        await Messages.deleteMany({});

        const usersUpdated = [];
        for(const user of usersData){
            const newPW = await bcrypt.hash(user.password, 10);
            usersUpdated.push({...user, password: newPW});
        }

        await Jobs.insertMany(jobsData);
        await User.insertMany(usersUpdated);
        await Messages.insertMany(messagesData);
    }
    catch(err) {
        console.log(err);
        return Promise.reject(err);
    }
}

module.exports = seed;