// to run this script, go to terminal and enter:
//mongo < db_setup.js (make sure you're in the db directory, or provide path to it!)

// set up development db
use oddjobs
db.dropDatabase()
use oddjobs
db.createCollection('messages')
db.createCollection('users')
db.createCollection('jobs')

// set up test db
use oddjobs_test
db.dropDatabase()
use oddjobs_test
db.createCollection('messages')
db.createCollection('users')
db.createCollection('jobs')
