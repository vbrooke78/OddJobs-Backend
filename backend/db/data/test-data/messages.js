module.exports = [
{
    _id: 1,
    date: new Date(2022, 4, 1, 11, 0, 0),
    job_id: 3,
    content: [
        {user_id: 1, text: "Hi"},
        {user_id: 2, text: "Hi"},
        {user_id: 1, text: "I can do the job for you"},
        {user_id: 2, text: "Excellent, thanks"},
    ]
},
{
    _id: 2,
    date: new Date(2022, 4, 1, 17, 0, 0),
    job_id: 2,
    content: [
        {user_id: 3, text: "Good morning"},
        {user_id: 1, text: "Hey"},
        {user_id: 3, text: "Are you free today?"},
    ]
},
{
    _id: 3,
    date: new Date(2022, 4, 2, 9, 0, 0),
    job_id: 4,
    content: [
        {user_id: 2, text: "Are you there?"},
        {user_id: 3, text: "Yes"},
        {user_id: 3, text: "Can you help me?"},
    ]
},
{
    _id: 4,
    date: new Date(2022, 4, 2, 12, 0, 0),
    job_id: 1,
    content: [
        {user_id: 4, text: "I can lend you a tool for the job"},
        {user_id: 1, text: "Thanks, that is helpful"},
        {user_id: 4, text: "Are you free this afternoon?"},
        {user_id: 1, text: "Yes"},
        {user_id: 4, text: "Ok, I will drop it round"},
    ]
},
]