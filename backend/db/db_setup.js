// to run this script, go to terminal and enter:
//mongo < db_setup.js (make sure you're in the db directory, or provide path to it!)

use oddjobs
db.dropDatabase()
use oddjobs
db.createCollection('messages')
db.createCollection('users')
db.createCollection('jobs')

