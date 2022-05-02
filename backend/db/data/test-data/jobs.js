const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {ObjectId} = require('mongodb');

module.exports = [
{
    _id: "000000000001",
    location: "need location data",
    title: "Put up a shelf",
    description: "Bought a shelf from Ikea, need help putting it up. Thanks!",
    price: 5.00,
    category: "DIY",
    user_id: '000000000001'
},
{
    _id: '000000000002',
    location: "need location data",
    title: "Pick up shopping",
    description: "I need some shopping picked up at 5pm today",
    price: 4.00,
    category: "delivery",
    user_id: '000000000003'
},
{
    _id: '000000000003',
    location: "need location data",
    title: "Walking my dogs",
    description: "Need someone to walk my dogs everyday in the morning",
    price: 6.00,
    category: "pets",
    user_id: '000000000001'
},
{
    _id: '000000000004',
    location: "need location data",
    title: "remove furniture",
    description: "I need to take my furniture to the tip. Need someone's help with a suitable vehicle",
    price: 15.00, 
    category: "delivery",
    user_id: '000000000003'
}
]