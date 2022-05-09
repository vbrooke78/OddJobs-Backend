const Messages = require("../schemas/messages.schema");
const Jobs = require("../schemas/jobs.schema.js");
const User = require("../schemas/users.schema.js");
exports.postMessage = async (MsgObj) => {
  const { users } = MsgObj;
  for (let i = 0; i < users.length; i++) {
    const user = await User.findById(users[i].userId);
    if (!user) return Promise.reject(errors.errMsg_idNotFound);
  }
  const res = await Messages.create({
    users: [
      { userId: users[0].userId, isRead: users[0].isRead },
      { userId: users[1].userId, isRead: users[1].isRead },
    ],
    messages: [],
  });
  return res;
};

exports.getMessage = async ({ message_id }) => {
  const message = await Messages.findById(message_id);
  if (!message) return Promise.reject(errors.errMsg_idNotFound);
  console.log(message);
  return message;
};

exports.postContent = async (message_id, body) => {
  console.log(message_id);
  console.log(body);
  const message = await Messages.findById(message_id);
  console.log(message);
  const content = {
    userId: body.userId,
    content_type: body.content_type,
    content: body.content,
  };

  message.messages.push(content);

  message.save();

  return message;
};
