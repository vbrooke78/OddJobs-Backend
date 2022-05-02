// const mongoose = require("mongoose");
// const connectDB = require("../backend/config/db");
// const {connectDB}
// describe('mongo test', () => {
//     let mongoClient: typeof mongoose;
//     beforeAll(async () => {
//         mongoClient = await connectDB(process.env.MONGO_URI as string)
//     })
//     afterAll(async () => {
//         await mongoClient.connection.close()
//     })
//     afterEach(async ( => {
//         await mongoClient.connection.db.dropDatabase()
//     }))
// });

const app = require('../app.js');
const request = require('supertest');
const db = undefined; //need to get this from mongoose, but totally don't understand mongoose!


