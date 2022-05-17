# Odd Jobs Backend

> This is the frontend part of our group project, Odd Jobs, a mobile app to help connect members of the community who require, or wish to offer, help with odd jobs. Users have the ability to either post a job, or respond to a posted job. There is also an integrated chat feature which enables users to communicate about a job. The user’s location is pinned to a map which displays jobs in the surrounding area.
 
The repo for the frontend can be found here:

https://github.com/vbrooke78/OddJobs-Frontend


## Tech Stack

- mongoDB
- node js
- mongoose
- express
- jest/TDD
- colors

## Link to hosted version

https://odd-jobs-backend.herokuapp.com/api

## Installation Instructions

To install and run tests locally:

**1. Install MongoDB**

- The project uses MongoDB v5.0.8
- Install mongodb locally on your machine. (If using WSL, follow these instructions for installing and starting server https://docs.microsoft.com/en-us/windows/wsl/tutorials/wsl-database)

- Start the mongodb server (command my differ depending on OS)

```sh
sudo service mongodb start
```

- The server should be running on your machine locally at 127.0.0.1:27017

**2. Install Project depencences**

```sh
npm i
```

**3. Create Databases**

- The project has development and test databases
- To create them:
  - cd into backend/db/
  - run the following command
  ```sh
  mongodb < db_setup.js
  ```
  - This will create empty databases. The seed function (ran before tests) will populate them

**4. Create Environment Variables**

- For the server to find the local databases, environment variables will need to set up.
- Create 2 different files, one for the development db and one for the test db:

.env.development

```
  MONGO_URI = mongodb://127.0.0.1:27017/oddjobs
```

.env.test

```
MONGO_URI = mongodb://127.0.0.1:27017/oddjobs_test
```

**5. Running Tests**

- Test Database Data is reseeded before every test
- To run tests:

```sh
npm test
```

**6. Running the server**

- To run the server locally:

```sh
npm start
```

## Authors

👤 **Authors**

- [Vicky Brooke · GitHub](https://github.com/vbrooke78) 
- [Akin Fagbohun · GitHub](https://github.com/datboyakin)
- [Tim Tucker · GitHub](https://github.com/timwtuck)
- [John Murphy · GitHub](https://github.com/johndmurphy)
- [Shaun Clarke · GitHub](https://github.com/Tavelar/)

## Show your support

Give a ⭐️ if you like this project!

## Acknowledgments

- [@northcoders](https://github.com/northcoders)
