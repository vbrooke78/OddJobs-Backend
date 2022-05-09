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
  //   console.log(message_id, content_id);
  const message = await Messages.findById(message_id);
  let res;
  const update = {
    content: body.content,
  };

  console.log(message.messages[0]._id);
  console.log(message.messages[0]._id);
  for (let i = 0; i < message.messages.length; i++) {
    if (message.messages[i].userId === "303030303030303030303033") {
      console.log("inside");
      res = await Messages.findByIdAndUpdate(message.messages[i]._id, update);
    }
  }
  console.log(message);
  const content = await message.findById(content_id);
  console.log(content, "content");
  //   console.log(body);
  console.log(res);
  return res;
  //   62796c1a4d206511b8fbc720
  console.log(message.messages);
};
