module.exports = [
{
    _id: '000000000001',
    date: new Date(2022, 4, 1, 11, 0, 0),
    job_id: '000000000003',
    content: [
        {user_id: '000000000001', text: "Hi"},
        {user_id: '000000000002', text: "Hi"},
        {user_id: '000000000001', text: "I can do the job for you"},
        {user_id: '000000000002', text: "Excellent, thanks"},
    ]
},
{
    _id: '000000000002',
    date: new Date(2022, 4, 1, 17, 0, 0),
    job_id: '000000000002',
    content: [
        {user_id: '000000000003', text: "Good morning"},
        {user_id: '000000000001', text: "Hey"},
        {user_id: '000000000003', text: "Are you free today?"},
    ]
},
{
    _id: '000000000003',
    date: new Date(2022, 4, 2, 9, 0, 0),
    job_id: '000000000004',
    content: [
        {user_id: '000000000002', text: "Are you there?"},
        {user_id: '000000000003', text: "Yes"},
        {user_id: '000000000003', text: "Can you help me?"},
    ]
},
{
    _id: '000000000004',
    date: new Date(2022, 4, 2, 12, 0, 0),
    job_id: '000000000001',
    content: [
        {user_id: '000000000004', text: "I can lend you a tool for the job"},
        {user_id: '000000000001', text: "Thanks, that is helpful"},
        {user_id: '000000000004', text: "Are you free this afternoon?"},
        {user_id: '000000000001', text: "Yes"},
        {user_id: '000000000004', text: "Ok, I will drop it round"},
    ]
},
]