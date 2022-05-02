const Jobs = require('../../models/jobsModels.js');
const User = require('../../models/userModels.js');

async function seed({messagesData, jobsData, usersData}) {

    try {
        await Jobs.deleteMany({});
   //     await User.deleteMany({});

        await Jobs.insertMany(jobsData);
   //     await User.insertMany(messagesData);
    }
    catch(err) {
        console.log(err);
    }
}

module.exports = seed;