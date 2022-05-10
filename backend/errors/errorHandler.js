exports.errMsg_invalidPostObj = { status: 400, msg: "Invalid Post Object" };
exports.errMsg_idNotFound = { status: 404, msg: "ID Not Found" };
exports.errMsg_generic = { status: 500, msg: "Something went wrong" };
exports.errMsg_uniqueFieldExists = (field) => {
  return { status: 400, msg: `${field} already exists` };
};
exports.errMsg_invalidItem = (item) => {
  return { status: 400, msg: `Invalid ${item}` };
};

exports.error_custom = (err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send(err);
  } else {
    next(err);
  }
  console.log(err)
};

exports.error_mongoDb = (err, req, res, next) => {
  if (
    err.path === "_id" &&
    err.kind === "ObjectId" &&
    err.valueType !== "ObjectId"
  ) {
    res.status(400).send({ msg: "Invalid ID Format" });
  } else {
    next(err);
  }
};

exports.error_pathNotFound = (req, res, next) => {
  res.status(404).send({ msg: "Path Not Found" });
};
