const {messagesData, jobsData, usersData} = require('../data/test-data');
const { MongoClient } = require('mongodb');

async function seed() {

    const uri = 'mongodb://127.0.0.1:27017/oddjobs';
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        const db = client.db('test_db');

        // delete all, and then reseed
        await deleteAllListings(db);
        await createListings(db, "messages", messagesData);
        await createListings(db, "users", usersData);
        await createListings(db, "jobs", jobsData);   

    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}

async function createListings(db, collection, newListing){

    const result = await db.collection(collection).insertMany(newListing);
    console.log(`New listing created with the following id: ${result.insertedId}`);
}

async function deleteAllListings(db){

    const messagesResult = await db.collection("messages").deleteMany({});
    const userseResult = await db.collection("users").deleteMany({});
    const jobsResult = await db.collection("jobs").deleteMany({});

    Promise.all([
        db.collection("messages").deleteMany({}),
        db.collection("users").deleteMany({}), 
        db.collection("jobs").deleteMany({})])
        .then(([mResult, uResult, jResult]) => {
            console.log(`Messages: ${mResult}`,
            `Users: ${uResult}`, `Jobs: ${jResult}`);
        })
        .catch((err) => {
            console.log(err);
        });
}

seed().catch(console.error);