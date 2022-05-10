const Messages = require("../schemas/messages.schema");
const Jobs = require("../schemas/jobs.schema.js");
const User = require("../schemas/users.schema.js");
exports.postMessage = async (MsgObj) => {
  console.log(MsgObj);
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

exports.putMessage = async (ids, body) => {
  const { message_id, content_id } = ids;

  const message = await Messages.findById(message_id);

  for (let i = 0; i < message.messages.length; i++) {
    console.log(message.messages[i]);
    if (message.messages[i]._id.equals(content_id)) {
      message.messages[i].content = body.content;
    }
  }

  message.save();
  return message;
};
