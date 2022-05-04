const asyncHandler = require("express-async-handler");
const User = require("../schemas/users.schema.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const errors = require('../errors/errorHandler.js');


exports.createNewUser = async (userInfo) => {

    const newUser = await _validateNewUser(userInfo);
    const newPassword = await bcrypt.hash(newUser.password, 10);

    return await User.create({...newUser, password: newPassword});
};

exports.getAllUsers = async () => {

    return await User.find({});
}

exports.getUserById = async (userId) => {

    const user = await User.findById(userId);

    if (!user) 
        return Promise.reject(errors.errMsg_idNotFound);
    
    return user;
}

exports.loginUser = async (username, password) => {
    
    const user = await User.findOne({username});

    if (!user) {
        return Promise.reject(errors.errMsg_invalidItem('username'));
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
        return Promise.reject(errors.errMsg_invalidItem('password'))
    }

    const token = jwt.sign(
        {
        name: user.username,
        email: user.email,
        },
        "waefgqw4gqregrqegaergre"
    );

    return {token: token, user_id: user.id };
}


const _validateNewUser = async (userInfo) => {

    const keys = ['username', 'fullName', 'email', 'password'];
    const newUser = {};

    // copy only relevant fields to new object, reject if any empty
    for (const key of keys){
        if (!userInfo[key])
            return Promise.reject(errors.errMsg_invalidPostObj);
        
        newUser[key] = userInfo[key];
    }

    const [userExists, usernameExists] = await Promise.all(
        [User.findOne({ email: userInfo.email }), 
        User.findOne({ username: userInfo.username})]);

    if (userExists || usernameExists){
      return Promise.reject(
          errors.errMsg_uniqueFieldExists(userExists?'Username':'Email'));
    }

    return newUser;
}


