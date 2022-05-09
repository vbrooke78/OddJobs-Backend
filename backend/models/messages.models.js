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

exports.putMessage = async (message_id, body) => {
  const message = await Messages.findById(message_id);
  let res;
  for (let i = 0; i < message.messages.length; i++) {
    if (message.messages[i].userId === body.user_id) {
      //   res = await Messages.findByIdAndUpdate(message_id);
    }
  }
  console.log(body);
  console.log(message.messages);
};
