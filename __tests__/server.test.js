const app = require('../backend/app.js');
const request = require('supertest');
const dbClient = require('../backend/db/db.js');
const seed = require('../backend/db/seeds/seed.js');
const testData = require('../backend/db/data/test-data');
const mongoose = require("mongoose");
dbClient();

beforeEach(async() => {
    await seed(testData);
});
beforeAll(() => dbClient());
afterAll(() => mongoose.disconnect());


describe('#Errors', () => {
    test('404: Path Not Found', () => {
        // Need to Implement
        expect(true).toBe(true);
    });
    test('400: Bad Request', () => {
        // Need to Implement
        expect(true).toBe(true);
    });
});




