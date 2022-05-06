module.exports = [
{
    _id: '000000000001',
    users: [
        {userID:  '000000000001', isRead: true },
        {userID:  '000000000002', isRead: true }
    ],
    messages: [
        {userId: '000000000001', content_type: "text",  content: "Hi", date: new Date(2022, 4, 1, 11, 12, 0)},
        {userId: '000000000002', content_type: "text", content: "Hi", date: new Date(2022, 4, 1, 11, 12, 5)},
        {userId: '000000000001', content_type: "text", content: "I can do the job for you", date: new Date(2022, 4, 1, 11, 12, 10)},
        {userId: '000000000002', content_type: "text", content: "Excellent, thanks", date: new Date(2022, 4, 1, 11, 12, 15)},
    ]
},
{
    _id: '000000000002',
    users: [
        {userID:  '000000000001', isRead: true },
        {userID:  '000000000003', isRead: true }
    ],
    messages: [
        {userId: '000000000003', content_type: "text",  content: "Good morning", date: new Date(2022, 4, 1, 17, 15, 30)},
        {userId: '000000000001', content_type: "text",  content: "Hey", date: new Date(2022, 4, 1, 17, 15, 35)},
        {userId: '000000000003', content_type: "text",  content: "Are you free today?", date: new Date(2022, 4, 1, 17, 15, 40)},
    ]
},
{
    _id: '000000000003',
    users: [
        {userID:  '000000000002', isRead: true },
        {userID:  '000000000003', isRead: true }
    ],
    messages: [
        {userId: '000000000002', content_type: "text",  content: "Are you there?", date: new Date(2022, 4, 2, 9, 9, 10)},
        {userId: '000000000003', content_type: "text",  content: "Yes", date: new Date(2022, 4, 2, 9, 9, 15)},
        {userId: '000000000003', content_type: "text",  content: "Can you help me?", date: new Date(2022, 4, 2, 9, 9, 20)},
    ]
},
{
    _id: '000000000004',
        users: [
        {userID:  '000000000001', isRead: true },
        {userID:  '000000000004', isRead: true }
    ],
    messages: [
        {userId: '000000000004', content_type: "text", content: "I can lend you a tool for the job", date: new Date(2022, 4, 2, 12, 19, 0)},
        {userId: '000000000001', content_type: "text", content: "Thanks, that is helpful", date: new Date(2022, 4, 2, 12, 19, 5)},
        {userId: '000000000004', content_type: "text", content: "Are you free this afternoon?", date: new Date(2022, 4, 2, 12, 19, 10)},
        {userId: '000000000001', content_type: "text", content: "Yes", date: new Date(2022, 4, 2, 12, 19, 15)},
        {userId: '000000000004', content_type: "text", content: "Ok, I will drop it round", date: new Date(2022, 4, 2, 12, 19, 20)},
    ]
},
]